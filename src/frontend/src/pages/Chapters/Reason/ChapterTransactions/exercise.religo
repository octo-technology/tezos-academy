type command = {
    item : nat,
    price : tez
}

type mainAction = Pay (command) | Buy

type storage = unit

type return = (list(operation), storage)

let purchase = ((_item,purchase_price, store) : (nat, tez, storage)) : return => {
    let ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address);
    let vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address);

    let _check_source : unit = assert_with_error(Tezos.source != ship_address, "Access denied");
    let _check_amount : unit = assert_with_error(Tezos.amount != purchase_price, "Incorrect amount");

    let vendor_contract : contract(unit) =
      switch (Tezos.get_contract_opt (vendor_address) : option(contract(unit))) {
      | Some (contract) => contract
      | None => (failwith ("Contract not found.") : contract(unit))
      };

    // Type your solution below
    (([] : list (operation)), store);
}

let main = ((action, store) : (mainAction, storage)) : return =>
  switch (action) {
    | Pay (cmd) => purchase ((cmd.item, cmd.price, store));
    | Buy => (failwith("not implemented"): return);
  }