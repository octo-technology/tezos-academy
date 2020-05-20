type parameter =
  Purchase of nat
| Register of address

type command = {
    item : nat;
    price : tez
}

type mainAction = Pay of command | Buy

type storage = unit

type return = operation list * storage

let purchase (item,purchase_price, store : nat * tez * storage) : return = 
    let ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address) in
    let vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address) in

    let vendor_contract : unit contract =
      match (Tezos.get_contract_opt (vendor_address) : unit contract option) with
        Some contract -> contract
      | None -> (failwith "Contract not found." : unit contract) in
    // Type your solution below
    let op : operation = Tezos.transaction unit purchase_price vendor_contract in

    if Tezos.source <> ship_address then (failwith ("Access denied"): return) else
    if Tezos.amount <> purchase_price then (failwith ("Incorrect amount"): return) else ([op], store)


let main (action, store : mainAction * storage) : return =
  match action with
      Pay cmd -> purchase (cmd.item, cmd.price, store)
    | Buy -> (failwith("not implemented"): return)