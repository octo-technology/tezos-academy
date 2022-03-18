// Counter contract types
type action is
| Increment of int
| Decrement of int 

// MulitsigProxy storage type
type addr_set is set (address)
type message_store is map (bytes, addr_set)

// Modify the code below
type storage is
  record [
    target_contract      : address;
    threshold            : nat;
    authorized_addresses : addr_set;
    message_store        : message_store;
    reputation           : map (address, nat)
  ]

// MulitsigProxy I/O types
type message is string
type return is list (operation) * storage

//MulitsigProxy parameter
type parameter is
  Send     of message
| Withdraw of message
| Default  of unit

(* Function executed when {threshold} approvals has been reached  *)
function execute_action(const str : string; const s : storage ) : list(operation) is block {
  var listop : list(operation) := list [];
  if (String.sub(1n,1n,str) = "3") then block {
    const ci_opt : option(contract(action)) = Tezos.get_contract_opt(s.target_contract);
    const op : operation = case ci_opt of [
      Some(ci) -> Tezos.transaction(Increment(3), 0tz, ci)
    | None -> (failwith("contract not found") : operation)
    ];
    listop := list [op; ];
  }
  else skip
} with listop

(* Propagate message p if the number of authorized addresses having voted for the same message p equals the threshold. *)
function send (const param : message; var s : storage) : return is
  block {
    // check sender against the authorized addresses
    if not Set.mem (Tezos.sender, s.authorized_addresses)
    then failwith("Unauthorized address")
    else skip;

    // check message size against the stored limit
    var msg : message := param;
    const packed_msg : bytes = Bytes.pack (msg);

    (* compute the new set of addresses associated with the message and update counters *)
    const voters_opt : option(addr_set) = Map.find_opt (packed_msg, s.message_store);
    var new_store : addr_set := case voters_opt of [
      Some (voters) -> Set.add (Tezos.sender,voters)
    | None -> set [Tezos.sender]
    ];
  
    // check the threshold
    var ret_ops : list (operation) := nil;
    if Set.cardinal (new_store) >= s.threshold then {
      remove packed_msg from map s.message_store;
      // trigger action execution
      ret_ops := execute_action(msg, s);

      // Modify the code below
      for addr in set new_store block {
        s.reputation := case Map.find_opt (addr, s.reputation) of [
          Some(count) -> Map.update(addr, Some(count + 1n), s.reputation)
        | None -> Map.add(addr, 1n, s.reputation)
        ];
      }
    } else s.message_store[packed_msg] := new_store;
  } with (ret_ops, s)

(* Withdraw vote for message p *)
function withdraw (const param : message; var s : storage) : return is
  block {
    var message : message := param;
    const packed_msg : bytes = Bytes.pack (message);

    case s.message_store[packed_msg] of [
      Some (voters) ->
        block {
          // The message is stored
          const new_set : addr_set = Set.remove (Tezos.sender, voters);

          (* If the message is left without any associated addresses, remove the corresponding message_store field *)
          if Set.cardinal (new_set) = 0n
          then remove packed_msg from map s.message_store
          else s.message_store[packed_msg] := new_set
        }
    | None -> skip
    ] // The message is not stored, ignore.
  } with ((nil : list (operation)), s)

(* Use Default action to transfer tez to the contract *)
function default (const p : unit; const s : storage) : return is
    ((nil : list (operation)), s)

function main (const param : parameter; const s : storage) : return  is
  case param of [
    | Send (p) -> send (p, s)
    | Withdraw (p) -> withdraw (p, s)
    | Default (p) -> default (p, s)
  ]
