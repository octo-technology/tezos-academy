type ship is
    record [
        name : string;
        code : string;
        price : tez
    ]

type registerAccess is map (string, int)

function main (const p : unit; const store : unit) : (list(operation) * unit) is
  block {
    const my_ship : ship =
        record [
            name = "Galactica";
            code = "222031";
            price = 1tez
        ];
    const reg : registerAccess =
        map [
            "Galactica" -> 3
        ];

    // Type your solution below
    const galactica_id : option(int) = reg["Galactica"];
    case galactica_id of
    | Some(i) -> reg["Galactica"] := i - 1
    | None -> failwith("Ship not registered")
    end

  } with ((nil: list(operation)), unit)