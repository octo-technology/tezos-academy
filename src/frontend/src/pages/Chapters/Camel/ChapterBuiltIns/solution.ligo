let purchase (purchase_price : tez) : bool =
    let ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address) in
    let vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address)
// Modify the code below
in if Tezos.source <> ship_address then (failwith ("Access denied"): bool) else 
    if Tezos.amount <> purchase_price then (failwith ("Incorrect amount"): bool) else true