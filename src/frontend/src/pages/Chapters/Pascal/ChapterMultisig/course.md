# Chapter 24 : Multi-signature pattern

<dialog character="mechanics">In case you didn't know, we have several nukes in our arsenal. The admiral and the president of the Galatic Union must agree on nuclear usage. We need the approval of both for nuclear weapons usage.</dialog>

In some case one may want to execute an action only if many users approve this action. This kind of pattern is called _multi-signature_.

## Multi-signature

When invoking a smart contract, an entrypoint is called and usually an action is executed (triggering a storage modification and/or transactions emmission).
The purpose of a multi-signature pattern is to execute an action when all preconditions has been verified. The action that need to be executed depends on the smart contract logic.
The mutli-signature implementation can be done in a single contract with the smart contract logic or in a separated contract like a proxy contract which emits transactions to the contract containing the logic.

### Rules

The multi-signature pattern can be described with this set of rules :

- a user can propose an action
- a user can approve an action (proposed by someone else)
- a user can cancel his approval on an action.
- an action is automatically executed when it has been approved by enough users (a threshold of number of approvals must be defined)
- the smart contract must also handle a list of user in order to specify who is allowed to approve an action

Optionnaly

- the smart contract can also handle the number of approval per user and set maximum number of approvals.
- the smart contract can also handle an inner state. Everytime an action is executed the inner state of the multi-signature contract is updated for tracability purpose

More complex rules can be added these basic ones.

### Implementation of multi-signature patterns

Let's consider this implementation of the multi-signature pattern. This implementation takes all previously mentionned rules into account.

This smart contract _MultisigProxy_ intends to play the role of a proxy pattern for the _Counter_ contract.
The _Counter_ contract (the example at https://ide.ligolang.org/p/-hNqhvMFDFdsTULXq4K-KQ) has been deployed at address : KT1CFBbdhRCNAzNkX56v361XZToHCAtjSsVS
The _Counter_ contract handle a simple integer counter which can be incemented or decremented.

Instead of invoking the _Counter_ contract, users propose a modification of the counter (e.g. Increment(5)) to the _MultisigProxy_ contract which will forward it to the _Counter_ contract (if approved by other users).

A user can invoke the entry point _Send_ of the smart contract _MultisigProxy_ to propose or approve a modification of the counter. When the number of approvals is reached, the desired modification is sent to the contract _Counter_ via a transaction. A user can invoke the entry point _Withdraw_ of the smart contract _MultisigProxy_ to reject a proposed modification.

```
// Counter contract types
type action is
| Increment of int
| Decrement of int

// MultisigProxy storage type
type addr_set is set (address)
type message_store is map (bytes, addr_set)
type proposal_counters is map (address, nat)

type storage is
  record [
    target_contract      : address;
    state_hash           : bytes;
    threshold            : nat;
    max_proposal         : nat;
    max_message_size     : nat;
    authorized_addresses : addr_set;
    message_store        : message_store;
    proposal_counters    : proposal_counters
  ]

// MultisigProxy I/O types
type message is string
type return is list (operation) * storage

// MultisigProxy parameter
type parameter is
  Send     of message
| Withdraw of message
| Default  of unit

(* Function executed when {threshold} approvals has been reached  *)
function execute_action(const str : string; const s : storage ) : list(operation) is block {
  var listop : list(operation) := list [];
  if (String.sub(1n,1n,str) = "3") then block {
    const ci_opt : option(contract(action)) = Tezos.get_contract_opt(s.target_contract);
    const op : operation = case ci_opt of
      Some(ci) -> Tezos.transaction(Increment(3), 0tz, ci)
    | None -> (failwith("contract not found") : operation)
    end;
    listop := list [op; ];
  }
  else skip
} with listop

function send (const param : message; const s : storage) : return is
  block {
    // check sender against the authorized addresses
    if not Set.mem (Tezos.sender, s.authorized_addresses)
    then failwith("Unauthorized address")
    else skip;

    // check message size against the stored limit
    var msg : message := param;
    const packed_msg : bytes = Bytes.pack (msg);
    if Bytes.length (packed_msg) > s.max_message_size
    then failwith ("Message size exceed maximum limit")
    else skip;

    (* compute the new set of addresses associated with the message and update counters *)
    var new_store : addr_set := set [];
    const voters_opt : option(addr_set) = Map.find_opt (packed_msg, s.message_store);
    case voters_opt of
      Some (voters) ->
        block {
          (* The message is already stored. Increment the counter only if the sender is not already associated with the message. *)
          if Set.mem (Tezos.sender, voters)
          then skip
          else s.proposal_counters[Tezos.sender] :=
                 get_force (Tezos.sender, s.proposal_counters) + 1n;
                 new_store := Set.add (Tezos.sender,voters)
        }
    | None ->
        block {
          // the message has never been received before
          s.proposal_counters := case Map.find_opt (Tezos.sender, s.proposal_counters) of
            Some(count) -> Map.update(Tezos.sender, Some(count + 1n), s.proposal_counters)
          | None -> Map.add(Tezos.sender, 1n, s.proposal_counters)
          end;
          new_store := set [Tezos.sender];
        }
    end;

    // check sender counters against the maximum number of proposal
    var sender_proposal_counter : nat := get_force (Tezos.sender, s.proposal_counters);
    if sender_proposal_counter > s.max_proposal
    then failwith ("Maximum number of proposal reached")
    else skip;

    // check the threshold
    var ret_ops : list (operation) := nil;
    if Set.cardinal (new_store) >= s.threshold then {
      remove packed_msg from map s.message_store;
      // trigger action execution
      ret_ops := execute_action(msg, s);
      // update the state hash
      s.state_hash := Crypto.sha256 (Bytes.concat (s.state_hash, packed_msg));
      // decrement the counters
      for addr -> ctr in map s.proposal_counters block {
        if Set.mem (addr, new_store) then
          s.proposal_counters[addr] := abs (ctr - 1n)
        else skip
      }
    } else s.message_store[packed_msg] := new_store;
  } with (ret_ops, s)

function withdraw (const param : message; const s : storage) : return is
  block {
    var message : message := param;
    const packed_msg : bytes = Bytes.pack (message);

    case s.message_store[packed_msg] of
      Some (voters) ->
        block {
          // The message is stored
          const new_set : addr_set = Set.remove (Tezos.sender, voters);

          (* Decrement the counter only if the sender was already associated with the message *)
          if Set.cardinal (voters) =/= Set.cardinal (new_set)
          then s.proposal_counters[Tezos.sender] :=
                 abs (get_force (Tezos.sender, s.proposal_counters) - 1n)
          else skip;

          (* If the message is left without any associated addresses, remove the corresponding message_store field *)
          if Set.cardinal (new_set) = 0n
          then remove packed_msg from map s.message_store
          else s.message_store[packed_msg] := new_set
        }
    | None -> skip
    end // The message is not stored, ignore.
  } with ((nil : list (operation)), s)

function default (const p : unit; const s : storage) : return is
    ((nil : list (operation)), s)

function main (const param : parameter; const s : storage) : return  is
  case param of
    (* Propagate message p if the number of authorized addresses having voted for the same message p equals the threshold. *)
    | Send (p) -> send (p, s)
    (* Withdraw vote for message p *)
    | Withdraw (p) -> withdraw (p, s)
    (* Use this action to transfer tez to the contract *)
    | Default (p) -> default (p, s)
  end

```

Notice in the _Send_ function the number of voters is compared to the threshold. If threshold is reached :

<!-- prettier-ignore -->* the message *packed\_msg* is removed from *message\_storage*

- the action is executed and takes the _string_ as parameter
<!-- prettier-ignore -->* the inner state *state\_hash* of the contract is updated by creating a hash key of old state + treated message
- the counter (of number of proposals) is updated. This is used to compute the limit of maximum of proposal.

```
  if Set.cardinal (new_store) >= s.threshold then {
    remove packed_msg from map s.message_store;
    // trigger action execution
    ret_ops := execute_action(msg, s);
    // update the state hash
    s.state_hash := Crypto.sha256 (Bytes.concat (s.state_hash, packed_msg));
    // decrement the counters
    for addr -> ctr in map s.proposal_counters block {
      if Set.mem (addr, new_store) then
        s.proposal_counters[addr] := abs (ctr - 1n)
      else skip
    }
  }
```

Notice in the _Withdraw_ function :

- if a message proposal has no voters then it is removed
- the counter (of number of proposals) is updated. This is used to compute the limit of maximum of proposal.

## Your mission

<!-- prettier-ignore --> 1- Notice that the storage contains a property called *reputation* which associates a _nat_ number to a voter.

<!-- prettier-ignore --> 2- Modify the *increment* function to modify the reputation of a given *addr* address by granting one point of reputation.  (use *count* as temporary variable for the _switch_ operator). If the voter is not registered yet in the *reputation* registry then add him. Otherwise update its reputation by incrementing by one its actual level. It is recommanded to use Map.add and Map.update when modifying a _map_.

<!-- prettier-ignore --> 3- Modify the *reputation_updated* variable (representing the new state of reputations) by iterating on voters with a _Set.fold_ operation and applying *increment* function on reputation.
