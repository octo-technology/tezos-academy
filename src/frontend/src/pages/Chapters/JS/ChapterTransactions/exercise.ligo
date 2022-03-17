let purchase = (purchase_price : tez) : bool => {
  const ship_address: address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" as address);
  const vendor_address: address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" as address);

  if (Tezos.source != ship_address) {
      failwith ("Access denied");
  } else {
     unit;
  };
  if (Tezos.amount != purchase_price) {
     failwith ("Incorrect amount");
  } else {
     unit;
  };
  const vendor_contract: contract<unit> = match(
    Tezos.get_contract_opt(vendor_address) as option<contract<unit>>, {
        Some: (contract: option<contract<unit>>) => contract,
        None: () => failwith ("Contract not found.") as contract<unit>,
    }
  );
  // Type your solution below

  return true;
};

