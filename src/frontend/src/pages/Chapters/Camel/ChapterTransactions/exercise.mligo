type command = {
    item : nat;
    price : tez
}

type mainAction = Pay of command | Buy

type storage = unit

type return = operation list * storage

let purchase (_item,purchase_price, store : nat * tez * storage) : return = 
    let ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address) in
    let vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address) in

    let _check_source : unit = assert_with_error (Tezos.source <> ship_address) "Access denied" in
    let _check_amount : unit = assert_with_error (Tezos.amount <> purchase_price) "Incorrect amount" in
    
    let vendor_contract : unit contract =
      match (Tezos.get_contract_opt (vendor_address) : unit contract option) with
        Some contract -> contract
      | None -> (failwith "Contract not found." : unit contract) in
    
    // Type your solution below

    (([] : operation list), store)

let main (action, store : mainAction * storage) : return =
  match action with
      Pay cmd -> purchase (cmd.item, cmd.price, store)
    | Buy -> (failwith("not implemented"): return)