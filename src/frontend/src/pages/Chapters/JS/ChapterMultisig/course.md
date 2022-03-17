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

Optionally

- the smart contract can also handle the number of approval per user and set the maximum number of approvals.
- the smart contract can also handle an inner state. Everytime an action is executed the inner state of the multi-signature contract is updated for tracability purpose

More complex rules can be added to these basic ones.

### Implementation of multi-signature patterns

Let's consider this implementation of the multi-signature pattern. This implementation takes all previously mentionned rules into account.

This smart contract _MultisigProxy_ intends to play the role of a proxy pattern for the _Counter_ contract.
The _Counter_ contract (the example at https://ide.ligolang.org/p/-hNqhvMFDFdsTULXq4K-KQ) has been deployed at address : KT1CFBbdhRCNAzNkX56v361XZToHCAtjSsVS
The _Counter_ contract handle a simple integer counter which can be incremented or decremented.

Instead of invoking the _Counter_ contract, users propose a modification of the counter (e.g. Increment(5)) to the _MultisigProxy_ contract which will forward it to the _Counter_ contract (if approved by other users).

A user can invoke the entry point _Send_ of the smart contract _MultisigProxy_ to propose or approve a modification of the counter. When the number of approvals is reached, the desired modification is sent to the contract _Counter_ via a transaction. A user can invoke the entry point _Withdraw_ of the smart contract _MultisigProxy_ to reject a proposed modification.

```
// Counter contract types
type action =
  ["Decrement", int]
| ["Increment", int];

// MulitsigProxy storage type
type addr_set = set<address>;
type message_store = map<bytes, addr_set>;
type proposal_counters = map<address, nat>;

type storage = {
    authorized_addresses: addr_set,
    max_message_size: nat,
    max_proposal: nat,
    message_store,
    proposal_counters,
    state_hash: bytes,
    target_contract: address,
    threshold: nat
};

// MulitsigProxy I/O types
type message = string;
type return_ = [list<operation>, storage];

//MulitsigProxy parameter
type parameter =
  ["Default", unit]
| ["Send", message]
| ["Withdraw", message];

// Function executed when {threshold} approvals has been reached
const execute_action = (str: string, s: storage) : list<operation> => {
  if(String.sub(1 as nat, 1 as nat, str) == "3") {
    const ci: contract<action> = Tezos.get_contract_with_error(s.target_contract, "contract not found");
    const op: operation = Tezos.transaction(Increment(3), 0 as tez, ci);
    return list([op]);
  } else {
    return list([]) as list<operation>;
  }
};

const send = (param: message, s: storage) : return_ => {
    // check sender against the authorized addresses
    if (!Set.mem(Tezos.sender, s.authorized_addresses)) {
        failwith("Unauthorized address");
    } else {
        unit;
    };

    // check message size against the stored limit
    const msg: message = param;
    const packed_msg: bytes = Bytes.pack(msg);
    if (Bytes.length(packed_msg) > s.max_message_size) {
        failwith("Message size exceed maximum limit");
    } else {
        unit;
    };

    // compute the new set of addresses associated with the message and update counters
    const voters_opt: option<addr_set> = Map.find_opt(packed_msg, s.message_store);
    const [new_store, proposal_counters_updated] : [addr_set, proposal_counters] = match(voters_opt, {
        Some: (voters: addr_set) => {
            // The message is already stored. Increment the counter only if the sender is not already associated with the message.
            if (Set.mem(Tezos.sender, voters)) {
                return [Set.empty as addr_set, s.proposal_counters];
            } else {
                const updated: proposal_counters = match(Map.find_opt(Tezos.sender, s.proposal_counters), {
                    Some: (count: nat) => Map.update(Tezos.sender, Some(count + (1 as nat)), s.proposal_counters),
                    None: () => Map.add(Tezos.sender, 1 as nat, s.proposal_counters)
                });
                return [Set.add(Tezos.sender, voters), updated];
            };
        },
        None: () => {
            // the message has never been received before
            const updated: proposal_counters = match(Map.find_opt(Tezos.sender, s.proposal_counters), {
                Some: (count: nat) => Map.update(Tezos.sender, Some(count + (1 as nat)), s.proposal_counters),
                None: () => Map.add(Tezos.sender, 1 as nat, s.proposal_counters)
            });
            return [Set.add(Tezos.sender, Set.empty as addr_set), updated];
        }
    });

    // check sender counters against the maximum number of proposal
    const sender_proposal_counter: nat = match(Map.find_opt(Tezos.sender, proposal_counters_updated), {
        Some: (count: nat) => count,
        None: () => 0 as nat
    });
    if (sender_proposal_counter > s.max_proposal) {
        failwith ("Maximum number of proposal reached");
    } else {
        unit;
    };
    // check the threshold
    if (Set.size(new_store) >= s.threshold) {
        // remove packed_msg from map s.message_store;
        const message_store_updated: message_store = Map.update(packed_msg, None() as option<addr_set>, s.message_store);
        // trigger action execution
        const ret_ops: list<operation> = execute_action(msg, s);
        // update the state hash
        const new_state_hash: bytes = Crypto.sha256(Bytes.concat(s.state_hash, packed_msg));
        // decrement the counters
        const decrement = (addr: address, ctr: nat): nat => {
            if (Set.mem(addr, new_store)) {
                return abs(ctr - (1 as nat));
            } else {
                return ctr;
            };
        };
        let decremented_proposal_counters: proposal_counters = Map.map(decrement, proposal_counters_updated);
        return [ ret_ops, {
            ...s,
            proposal_counters:
            decremented_proposal_counters,
            state_hash: new_state_hash,
            message_store: message_store_updated
        }];
    } else {
        // update map s.message_store with (packed_msg, new_store);
        return [ list([]) as list<operation>, {
            ...s,
            proposal_counters: proposal_counters_updated,
            message_store: Map.update(packed_msg, Some(new_store), s.message_store)
        }];
    };
}

const withdraw = (param: message, s: storage) : return_ => {
    const packed_msg: bytes = Bytes.pack(param);

    return match(Map.find_opt(packed_msg, s.message_store), {
        Some: (voters: addr_set) => { // The message is stored
            const new_set: addr_set = Set.remove(Tezos.sender, voters);

            // Decrement the counter only if the sender was already associated with the message
            const proposal_counters_updated: proposal_counters = (() : proposal_counters => {
               if (Set.size(voters) != Set.size(new_set)) {
                 return match(Map.find_opt(Tezos.sender, s.proposal_counters), {
                     Some: (count: nat) => Map.update(Tezos.sender, Some(abs(count - (1 as nat))), s.proposal_counters),
                     None: () => Map.add(Tezos.sender, 1 as nat, s.proposal_counters)
                 });
               } else { return s.proposal_counters; };
            })();

            // If the message is left without any associated addresses, remove the corresponding message_store field
            const message_store_updated: message_store = (() : message_store => {
                if (Set.size(new_set) == (0 as nat)) {
                  // remove packed_msg from map s.message_store
                  return Map.update(packed_msg, None() as option<addr_set>, s.message_store);
                } else {
                  return Map.update(packed_msg, Some(new_set), s.message_store);
                }
            })();

            return [list([]) as list<operation>, {
                ...s,
                message_store: message_store_updated,
                proposal_counters: proposal_counters_updated
            }];
        },
        None: () => {// The message is not stored, ignore.
            return [list([]) as list<operation>, s];
        }
    });
};

const default_ = (_: unit, s: storage) : return_ => ([list([]) as list<operation>, s]);

const main = (param: parameter, s: storage) : return_ => match(param, {
    Send: (p: param) => send(p, s),
    Withdraw: (p: param) => withdraw(p, s),
    Default: (p: param) => default_(p, s)
});
```

Notice that in the _Send_ function the number of voters is compared to the threshold. If the threshold is reached then:

<!-- prettier-ignore -->* the message *packed\_msg* is removed from *message\_storage*

- the action is executed and takes the _string_ as parameter
<!-- prettier-ignore -->* the inner state *state\_hash* of the contract is updated by creating a hash key of old state + treated message
- the counter (of number of proposals) is updated. This is used to compute the limit of maximum of proposal.

```
// check the threshold
if (Set.size(new_store) >= s.threshold) {
    // remove packed_msg from map s.message_store;
    const message_store_updated: message_store = Map.update(packed_msg, None() as option<addr_set>, s.message_store);
    // trigger action execution
    const ret_ops: list<operation> = execute_action(msg, s);
    // update the state hash
    const new_state_hash: bytes = Crypto.sha256(Bytes.concat(s.state_hash, packed_msg));
    // decrement the counters
    const decrement = (addr: address, ctr: nat): nat => {
        if (Set.mem(addr, new_store)) {
            return abs(ctr - (1 as nat));
        } else {
            return ctr;
        };
    };
    let decremented_proposal_counters: proposal_counters = Map.map(decrement, proposal_counters_updated);
    return [ ret_ops, {
        ...s,
        proposal_counters:
        decremented_proposal_counters,
        state_hash: new_state_hash,
        message_store: message_store_updated
    }];
}
```

Notice that in the _Withdraw_ function :

- if a message proposal has no voters then it is removed
- the counter (of number of proposals) is updated. This is used to compute the limit of maximum of proposal.


## Your mission

<!-- prettier-ignore --> We have a basic mutli-signature contract but voters don't approve quickly enough. Maybe if we grant a reward to signers it may speed the voting process. Modify the existing *Multisig* contract in order to handle a reputation level for each voters. We plan to grant "reputation" points when the message is really executed (one "reputation" point for each voters).

<!-- prettier-ignore --> 1- Notice that the storage contains a property called *reputation* which associates a _nat_ number to a voter.

<!-- prettier-ignore --> 2- Modify the *increment* function to modify the reputation of a given *addr* address by granting one point of reputation.  (use *count* as temporary variable for the _match_ operator). If the voter is not registered yet in the *reputation* registry then add him. Otherwise update its reputation by incrementing by one its actual level. It is recommanded to use Map.add and Map.update when modifying a _map_.

<!-- prettier-ignore --> 3- Modify the *reputation_updated* variable (representing the new state of reputations) by iterating on voters with a _Set.fold_ operation and applying *increment* function on reputation.
