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
  return true;
};
