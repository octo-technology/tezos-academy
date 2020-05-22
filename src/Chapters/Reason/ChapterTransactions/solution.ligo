type parameter =
  Purchase (nat)
| Register (address)

type command = {
    item : nat,
    price : tez
}

type mainAction = Pay (command) | Buy

type storage = unit

type return = (list(operation), storage)

let purchase = ((item,purchase_price, store) : (nat, tez, storage)) : return => {
    let ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address);
    let vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address);

    let vendor_contract : contract(unit) =
      switch (Tezos.get_contract_opt (vendor_address) : option(contract(unit))) {
      | Some (contract) => contract
      | None => (failwith ("Contract not found.") : contract(unit))
      };
    // Type your solution below
    let op : operation = Tezos.transaction (unit, purchase_price, vendor_contract);

    if (Tezos.source != ship_address) { (failwith ("Access denied"): return) } else {
        if (Tezos.amount != purchase_price) { (failwith ("Incorrect amount"): return) } else {
            ([op], store);
        };
    };
}

let main = ((action, store) : (mainAction, storage)) : return =>
  switch (action) {
    | Pay (cmd) => purchase ((cmd.item, cmd.price, store));
    | Buy => (failwith("not implemented"): return);
  }