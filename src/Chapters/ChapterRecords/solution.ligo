// Type your solution below (section 1)
type ship is
    record [
        name : string;
        code : string;
        price : tez
    ]

function main (const p : unit; const store : unit) : (list(operation) * unit) is
  block {
    // Type your solution below (section 2)
    const my_ship : ship =
        record [
            name = "Galactica";
            code = "222031";
            price = 1tez
        ]

  } with ((nil: list(operation)), unit)