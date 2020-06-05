// Counter contract types
type action =
| Increment (int)
| Decrement (int) 

// MulitsigProxy storage type
type addr_set = set (address)
type message_store = map (bytes, addr_set)
type reputation = map (address,nat)

type storage = {
    target_contract      : address,
    threshold            : nat,
    authorized_addresses : addr_set,
    message_store        : message_store,
    reputation           : reputation
}

// MulitsigProxy I/O types
type message = string
type return = (list (operation), storage)

//MulitsigProxy parameter
type parameter =
  Send     (message)
| Withdraw (message)
| Default  (unit)

// Function executed when {threshold} approvals has been reached 
let execute_action = ((str, s) : (string, storage) ) : list(operation) => 
{
  if (String.sub(1n,1n,str) == "3") {
    let ci_opt : option(contract(action)) = Tezos.get_contract_opt(s.target_contract);
    let op : operation = switch (ci_opt) {
    | Some(ci) => Tezos.transaction(Increment(3), 0tz, ci)
    | None => (failwith("contract not found") : operation)
    };
    let listop : list(operation) = [ op ];
    listop;
  }
  else { ([] : list(operation)) }
}

let send = ((param,s) : (message ,storage)) : return =>
{
    // check sender against the authorized addresses
    if (Set.mem (Tezos.sender, s.authorized_addresses) == false) { 
        (failwith("Unauthorized address") : return)
    } else { 
        let msg : message = param;
        let packed_msg : bytes = Bytes.pack (msg);

        // compute the new set of addresses associated with the message and update counters
        let voters_opt : option(addr_set) = Map.find_opt (packed_msg, s.message_store);
        let new_voters : addr_set = switch (voters_opt) {
        | Some (voters) => {
            // The message is already stored. Increment the counter only if the sender is not already associated with the message.
            if (Set.mem (Tezos.sender, voters)) { 
              (Set.empty : addr_set) 
            } else {
              Set.add (Tezos.sender,voters)
            }
        }
        | None => {
            // the message has never been received before
            Set.add(Tezos.sender, (Set.empty : addr_set))
          }
        };

        // check the threshold
        if (Set.cardinal (new_voters) >= s.threshold) {
          //remove packed_msg from map s.message_store;
          let message_store_updated : message_store = Map.update(packed_msg, (None : option(addr_set)), s.message_store);
          // trigger action execution
          let ret_ops : list (operation) = execute_action((msg, s));
          // update reputation
          // Modify the code below
          let increment = ((acc,addr): (reputation, address)) : reputation => acc;
          let reputation_updated : reputation = s.reputation;
          
          (ret_ops, {...s,reputation:reputation_updated,message_store:message_store_updated})
        } else { 
          //update map s.message_store with (packed_msg, new_voters);
          (([]:list(operation)), {...s,message_store:Map.update(packed_msg, Some(new_voters), s.message_store)})
        }
    };
} 

let withdraw = ((param, s) : (message, storage)) : return =>
 {
    let message : message = param;
    let packed_msg : bytes = Bytes.pack (message);

    switch (Map.find_opt (packed_msg, s.message_store)) {
      | Some (voters) => {  // The message is stored
          let new_set : addr_set = Set.remove (Tezos.sender, voters);
          
          // If the message is left without any associated addresses, remove the corresponding message_store field
          let message_store_updated : message_store = 
            if (Set.cardinal (new_set) == 0n) {
              //remove packed_msg from map s.message_store
              Map.update(packed_msg, (None : option(addr_set)), s.message_store);
            }
            else { 
              //remove sender from voters associated to packed_msg in map s.message_store
              Map.update(packed_msg, Some(new_set), s.message_store)
            };
          (([] : list (operation)),{...s,message_store:message_store_updated})
        }
    | None => (([] : list (operation)), s)    // The message is not stored, ignore.
  } 
} 

let default = ((p,s) : (unit, storage)) : return =>
    (([] : list (operation)), s)

let main = ((param,s) : (parameter, storage)) : return  =>
  switch (param) {
    // Propagate message p if the number of authorized addresses having voted for the same message p equals the threshold.
    | Send (p) => send ((p, s))
    // Withdraw vote for message p 
    | Withdraw (p) => withdraw ((p, s))
    // Use this action to transfer tez to the contract 
    | Default (p) => default ((p, s))
  }
