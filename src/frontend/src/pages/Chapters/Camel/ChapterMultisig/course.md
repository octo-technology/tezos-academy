# Chapter 24 : Multi-signature pattern

<dialog character="mechanics">Captain, we should warm up the weapons while we are still in FTL, we don't know what awaits us on the other side.</dialog>
Before any nuke strike, the admiral and the president of Galatic Union must agree on nuclear usage. We need the approval of both for nuclear weapons usage.

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

optionnaly

- the smart contract can also handle the number of approval per user and set maximum number of approvals.
- the smart contract can also handle an inner state. Everytime an action is executed the inner state of the multi-signature contract is updated for tracability purpose

More complex rules can be added these basic ones.

### Implementation of multi-signature pattern

Let's consider this implementation of the multi-signature pattern. This implementation takes all previously mentionned rules into account.

This smart contract _MultisigProxy_ intends to play the role of a proxy pattern for _Counter_ contract.
The _Counter_ contract (the exemple at https://ide.ligolang.org/p/-hNqhvMFDFdsTULXq4K-KQ) has been deployed at address : KT1CFBbdhRCNAzNkX56v361XZToHCAtjSsVS
The _Counter_ contract handle a simple integer counter which can be incemented or decremented.

Instead of invoking the _Counter_ contract, users propose a modification of the counter (e.g. Increment(5)) to the  _MultisigProxy_ contract which will forward it to the _Counter_ contract (if approved by other users).

A user can invoke the entry point *Send* of the smart contract _MultisigProxy_ to propose or approve a modification of the counter. When the number of approvals is reached, the desired modification is sent to the contract _Counter_ via a transaction. A user can invoke the entry point *Withdraw* of the smart contract _MultisigProxy_ to reject a proposed modification.


```
// Counter contract types
type action =
| Increment of int
| Decrement of int

// MultisigProxy storage type
type addr_set = (address) set
type message_store = (bytes, addr_set) map
type proposal_counters = (address, nat) map

type storage = {
    target_contract      : address;
    state_hash           : bytes;
    threshold            : nat;
    max_proposal         : nat;
    max_message_size     : nat;
    authorized_addresses : addr_set;
    message_store        : message_store;
    proposal_counters    : proposal_counters
}

// MultisigProxy I/O types
type message = string
type return = (operation list * storage)

// MultisigProxy parameter
type parameter =
  Send     of message
| Withdraw of message
| Default  of unit

// Function executed when {threshold} approvals has been reached
let execute_action (str, s : (string * storage) ) : operation list =
  if String.sub 1n 1n str  = "3" then
    let ci_opt : action contract option = Tezos.get_contract_opt s.target_contract in
    let op : operation = match (ci_opt) with
      Some(ci) -> Tezos.transaction (Increment(3)) 0tz ci
    | None -> (failwith("contract not found") : operation)
    in
    let listop : operation list = [ op ] in
    listop
  else  ([] : operation list)

let send (param,s : (message * storage)) : return =
    // check sender against the authorized addresses
    if (Set.mem Tezos.sender s.authorized_addresses = false) then
        (failwith("Unauthorized address") : return)
    else
        // check message size against the stored limit
        let msg : message = param in
        let packed_msg : bytes = Bytes.pack (msg) in
        if (Bytes.length packed_msg > s.max_message_size) then
          ( failwith ("Message size exceed maximum limit") : return )
        else
        // compute the new set of addresses associated with the message and update counters
          let voters_opt : addr_set option = Map.find_opt packed_msg s.message_store in
          let (new_store, proposal_counters_updated) : (addr_set * proposal_counters) = match (voters_opt) with
            Some (voters) ->
              // The message is already stored. Increment the counter only if the sender is not already associated with the message.
              if (Set.mem Tezos.sender voters) then
                ((Set.empty : addr_set), s.proposal_counters)
              else
                let updated : proposal_counters = match (Map.find_opt Tezos.sender s.proposal_counters) with
                  | Some(count) -> Map.update Tezos.sender (Some(count + 1n)) s.proposal_counters
                  | None -> Map.add Tezos.sender 1n s.proposal_counters
                in
                ( Set.add Tezos.sender voters, updated)

          | None ->
              // the message has never been received before
              let updated : proposal_counters = match (Map.find_opt Tezos.sender s.proposal_counters) with
                    Some(count) -> Map.update Tezos.sender (Some(count + 1n)) s.proposal_counters
                  | None -> Map.add Tezos.sender 1n s.proposal_counters
              in
              ( Set.add Tezos.sender (Set.empty : addr_set), updated )
          in

          // check sender counters against the maximum number of proposal
          let sender_proposal_counter : nat = match (Map.find_opt Tezos.sender proposal_counters_updated) with
            Some(count) -> count
          | None -> 0n
          in
          //let sender_proposal_counter : nat = get_force (Tezos.sender, proposal_counters_updated);
          if (sender_proposal_counter > s.max_proposal) then
            (failwith ("Maximum number of proposal reached") : return )
          else
            // check the threshold
            if (Set.cardinal new_store >= s.threshold) then
              //remove packed_msg from map s.message_store;
              let message_store_updated : message_store = Map.update packed_msg (None : addr_set option) s.message_store in
              // trigger action execution
              let ret_ops : operation list = execute_action (msg, s) in
              // update the state hash
              let new_state_hash : bytes = Crypto.sha256 (Bytes.concat s.state_hash packed_msg) in
              // decrement the counters
              let decrement = fun (addr,ctr: (address * nat)) -> if (Set.mem addr new_store) then abs(ctr - 1n) else ctr in
              let decremented_proposal_counters : proposal_counters = Map.map decrement proposal_counters_updated in

              (ret_ops, {s with proposal_counters=decremented_proposal_counters; state_hash=new_state_hash; message_store=message_store_updated})
            else
              //update map s.message_store with (packed_msg, new_store);
              (([]:operation list), {s with proposal_counters=proposal_counters_updated; message_store=Map.update packed_msg (Some(new_store)) s.message_store})

let withdraw (param, s : (message * storage)) : return =
    let message : message = param in
    let packed_msg : bytes = Bytes.pack (message) in

    match (Map.find_opt packed_msg s.message_store) with
      Some (voters) ->  // The message is stored
          let new_set : addr_set = Set.remove Tezos.sender voters in
          // Decrement the counter only if the sender was already associated with the message
          let proposal_counters_updated : proposal_counters =
            if (Set.cardinal voters <> Set.cardinal (new_set)) then
              //s.proposal_counters[Tezos.sender] := abs (get_force (Tezos.sender, s.proposal_counters) - 1n)
              let updated : proposal_counters = match (Map.find_opt Tezos.sender s.proposal_counters) with
                Some(count) -> Map.update Tezos.sender  (Some(abs(count - 1n))) s.proposal_counters
              | None -> Map.add Tezos.sender 1n s.proposal_counters
              in
              updated
            else
              s.proposal_counters
          in
          // If the message is left without any associated addresses, remove the corresponding message_store field
          let message_store_updated : message_store =
            if (Set.cardinal (new_set) = 0n) then
              //remove packed_msg from map s.message_store
              Map.update packed_msg (None : addr_set option) s.message_store
            else
              //s.message_store[packed_msg] := new_set
              Map.update packed_msg (Some(new_set)) s.message_store
          in
          (([] : operation list),{s with message_store=message_store_updated; proposal_counters=proposal_counters_updated})
    | None -> (([] : operation list), s)    // The message is not stored, ignore.

let default (p,s : (unit * storage)) : return =
    (([] : operation list), s)

let main (param,s : (parameter * storage)) : return  =
  match (param) with
    // Propagate message p if the number of authorized addresses having voted for the same message p equals the threshold.
      Send p -> send (p, s)
    // Withdraw vote for message p
    | Withdraw p -> withdraw (p, s)
    // Use this action to transfer tez to the contract
    | Default p -> default (p, s)
```

Notice in the _Send_ function the number of voters is compared to the threshold. If threshold is reached :

<!-- prettier-ignore -->* the message *packed\_msg* is removed from *message\_storage*

- the action is executed and takes the _string_ as parameter
<!-- prettier-ignore -->* the inner state *state\_hash* of the contract is updated by creating a hash key of old state + treated message
- the counter (of number of proposals) is updated. This is used to compute the limit of maximum of proposal.

```
if (Set.cardinal new_store >= s.threshold) then
  //remove packed_msg from map s.message_store;
  let message_store_updated : message_store = Map.update packed_msg (None : addr_set option) s.message_store in
  // trigger action execution
  let ret_ops : operation list = execute_action (msg, s) in
  // update the state hash
  let new_state_hash : bytes = Crypto.sha256 (Bytes.concat s.state_hash packed_msg) in
  // decrement the counters
  let decrement = fun (addr,ctr: (address * nat)) -> if (Set.mem addr new_store) then abs(ctr - 1n) else ctr in
  let decremented_proposal_counters : proposal_counters = Map.map decrement proposal_counters_updated in

  (ret_ops, {s with proposal_counters=decremented_proposal_counters; state_hash=new_state_hash; message_store=message_store_updated})
else
  //update map s.message_store with (packed_msg, new_store);
  (([]:operation list), {s with proposal_counters=proposal_counters_updated; message_store=Map.update packed_msg (Some(new_store)) s.message_store})
```

Notice in the _Withdraw_ function :

- if a message proposal has no voters then it is removed
- the counter (of number of proposals) is updated. This is used to compute the limit of maximum of proposal.

## Your mission

<!-- prettier-ignore --> We have a basic mutli-signature contract but voters don't approve quickly enough. Maybe if we grant a reward to signers it may speed the voting process. Modify the existing *Multisig* contract in order to handle a reputation level for each voters. We plan to grant "reputation" points when the message is really executed (one "reputation" point for each voters).

<!-- prettier-ignore --> 1- Notice that the storage contains a property called *reputation* which associates a _nat_ number to a voter.

<!-- prettier-ignore --> 2- Modify the *increment* function to modify the reputation of a given *addr* address by granting one point of reputation.  (use *count* as temporary variable for the _switch_ operator). If the voter is not registered yet in the *reputation* registry then add him. Otherwise update its reputation by incrementing by one its actual level. It is recommanded to use Map.add and Map.update when modifying a _map_.

<!-- prettier-ignore --> 3- Modify the *reputation_updated* variable (representing the new state of reputations) by iterating on voters with a _Set.fold_ operation and applying *increment* function on reputation.
