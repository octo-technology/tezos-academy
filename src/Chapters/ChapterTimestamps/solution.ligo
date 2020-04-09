// Type your solution below
type ship is
    record [
        name : string;
        code : string;
        price : tez;
        created_at : timestamp
    ]

const my_ship : ship =
    record [
        name : "Galactica";
        code : "222031";
        price : 1tez;
        created_at : Tezos.Now
    ]

// Type your solution below
type owner is map (string, string)
const owner_of : owner =
    map [
        ("Galactica" : "Adama")
    ]
