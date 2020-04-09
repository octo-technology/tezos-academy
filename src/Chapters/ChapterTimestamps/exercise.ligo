type ship is
    record [
        name : string;
        code : string;
        price : tez
    ]

const my_ship : ship =
    record [
        name : "Galactica";
        code : "222031";
        price : 1tez
    ]

// Type your solution below
type owner is map (string, string)
const owner_of : owner =
    map [
        ("Galactica" : "Adama")
    ]
