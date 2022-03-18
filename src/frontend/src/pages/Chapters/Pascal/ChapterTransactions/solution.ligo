function purchase (const purchase_price : tez) : list(operation) is
block {
    const ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address);
    const vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address);

    if Tezos.source =/= ship_address then failwith ("Access denied");
    if Tezos.amount =/= purchase_price then failwith ("Incorrect amount");

    const vendor_contract : contract (unit) =
      case (Tezos.get_contract_opt (vendor_address) : option (contract (unit))) of [
        Some (c) -> c
      | None -> (failwith ("Contract not found.") : contract (unit))
      ];
    // Type your solution below
    const op : operation = Tezos.transaction (unit, purchase_price, vendor_contract)
} with (list [op]: list(operation))