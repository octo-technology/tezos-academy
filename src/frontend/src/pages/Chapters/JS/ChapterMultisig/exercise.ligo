// Counter contract types
type action = 
  ["Decrement", int]
| ["Increment", int];

// MulitsigProxy storage type
type addr_set = set<address>;
type message_store = map<bytes, addr_set>;
type reputation = map<address, nat>;

type storage = {
    target_contract: address,
    threshold: nat,
    authorized_addresses: addr_set,
    message_store: message_store,
    reputation: reputation
};

// MulitsigProxy I/O types
type message = string;
type return_ = [list<operation>, storage];

//MulitsigProxy parameter
type parameter = 
  ["Send", message]
| ["Withdraw", message]
| ["Default", unit];

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

    // compute the new set of addresses associated with the message and update counters
    const voters_opt: option<addr_set> = Map.find_opt(packed_msg, s.message_store);
    const new_voters : addr_set = match(voters_opt, {
        Some: (voters: addr_set) => {
            // The message is already stored. Increment the counter only if the sender is not already associated with the message.
            if (Set.mem(Tezos.sender, voters)) {
                return Set.empty as addr_set;
            } else {
                return Set.add(Tezos.sender, voters);
            };
        },
        None: () => {
            return Set.add(Tezos.sender, Set.empty as addr_set);
        }
    });

    // check the threshold
    if (Set.size(new_voters) >= s.threshold) { 
        // remove packed_msg from map s.message_store;
        const message_store_updated: message_store = Map.update(packed_msg, None() as option<addr_set>, s.message_store);
        // trigger action execution
        const ret_ops: list<operation> = execute_action(msg, s);
        // update reputation
        // Modify the code below
        const increment = (acc: reputation, addr: address) : reputation => acc;
        const reputation_updated : reputation = s.reputation;
        return [ ret_ops, {
            ...s, 
            reputation: reputation_updated,
            message_store: message_store_updated
        }];
    } else { 
        // update map s.message_store with (packed_msg, new_store);
        return [ list([]) as list<operation>, {
            ...s, 
            message_store: Map.update(packed_msg, Some(new_voters), s.message_store)
        }];
    };
}

const withdraw = (param: message, s: storage) : return_ => {
    const packed_msg: bytes = Bytes.pack(param);

    return match(Map.find_opt(packed_msg, s.message_store), {
        Some: (voters: addr_set) => { // The message is stored
            const new_set: addr_set = Set.remove(Tezos.sender, voters);

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
