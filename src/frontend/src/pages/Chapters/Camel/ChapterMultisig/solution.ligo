// Counter contract types
type action =
| Increment of int
| Decrement of int

// MulitsigProxy storage type
type addr_set = (address) set
type message_store = (bytes, addr_set) map
type reputation = (address, nat) map

type storage = {
    target_contract      : address;
    threshold            : nat;
    authorized_addresses : addr_set;
    message_store        : message_store;
    reputation           : reputation
}

// MulitsigProxy I/O types
type message = string
type return = (operation list * storage)

//MulitsigProxy parameter
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
 
        // compute the new set of addresses associated with the message and update counters
        let voters_opt : addr_set option = Map.find_opt packed_msg s.message_store in
        let new_voters : addr_set = match (voters_opt) with
          Some (voters) -> 
            // The message is already stored. Increment the counter only if the sender is not already associated with the message.
            if (Set.mem Tezos.sender voters) then
              (Set.empty : addr_set)
            else 
              Set.add Tezos.sender voters
        | None -> 
            // the message has never been received before
            Set.add Tezos.sender (Set.empty : addr_set)
        in

        // check the threshold
        if (Set.cardinal new_voters >= s.threshold) then 
          //remove packed_msg from map s.message_store;
          let message_store_updated : message_store = Map.update packed_msg (None : addr_set option) s.message_store in
          // trigger action execution
          let ret_ops : operation list = execute_action (msg, s) in

          // update reputation
          // Modify the code below
          let increment = fun (acc,addr: (reputation * address)) -> match (Map.find_opt addr acc) with
              Some(count) -> Map.update addr (Some(count + 1n)) acc
            | None -> Map.add addr 1n acc
          in
          let reputation_updated : reputation = Set.fold increment new_voters s.reputation in
          
          (ret_ops, {s with reputation=reputation_updated; message_store=message_store_updated})
        else 
          //update map s.message_store with (packed_msg, new_voters);
          (([]:operation list), {s with message_store=Map.update packed_msg (Some(new_voters)) s.message_store})

let withdraw (param, s : (message * storage)) : return =
    let message : message = param in
    let packed_msg : bytes = Bytes.pack (message) in

    match (Map.find_opt packed_msg s.message_store) with
      Some (voters) ->  // The message is stored
          let new_set : addr_set = Set.remove Tezos.sender voters in

          // If the message is left without any associated addresses, remove the corresponding message_store field
          let message_store_updated : message_store = 
            if (Set.cardinal (new_set) = 0n) then
              //remove packed_msg from map s.message_store
              Map.update packed_msg (None : addr_set option) s.message_store
            else 
              //remove sender from voters associated to packed_msg in map s.message_store
              Map.update packed_msg (Some(new_set)) s.message_store
          in
          (([] : operation list),{s with message_store=message_store_updated})
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
