let purchase = (purchase_price : tez) : bool => {
    let ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address);
    let vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address);
// Modify the code below
    if (Tezos.source != ship_address) { failwith ("Access denied") };
    if (Tezos.amount != purchase_price) { failwith ("Incorrect amount") };
    true;
}