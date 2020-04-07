type ship is
    record [
        name : string;
        code : string;
        price : tez;
        created_at : timestamp
    ]

const my_ship : user =
    record [
        name : "Galactica";
        code : "222031";
        price : 1tez;
        created_at : Tezos.Now
    ]

// Type your solution below
type owner is map (string, address)
const owner_of : owner =
    map [
        ("Galactica" : ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address))
    ]
