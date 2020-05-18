function purchase (const purchase_price : tez) : bool is
block {
    const ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address);
    const vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address);

    // Type your solution below
    if Tezos.source =/= ship_address then failwith ("Access denied") else skip;
    if Tezos.amount =/= purchase_price then failwith ("Incorrect amount") else skip;

} with True