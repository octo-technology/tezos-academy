function purchase (const purchase_price : tez) : bool is
    const ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address);
    const vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address);

    if Tezos.source =/= ship_address then failwith ("Access denied");
    if Tezos.amount =/= purchase_price then failwith ("Incorrect amount");

    const vendor_contract : contract (unit) =
      case (Tezos.get_contract_opt (vendor_address) : option (contract (unit))) of
        Some (c) -> c
      | None -> (failwith ("Contract not found.") : contract (unit))
      end;
    // Type your solution below
    Tezos.transaction (unit, purchase_price, vendor_contract)
return True