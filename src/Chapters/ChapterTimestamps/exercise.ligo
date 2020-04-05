// Type your solution below
type ship is
    record [
        name : string;
        code : string;
        price : tez
    ]

const my_ship : user =
    record [
        name : "Galactica";
        code : "222031";
        price : 1tez
    ]

type owner is map (string, address)
const owner_of : owner =
    map [
        ("Galactica" : "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx")
    ]
