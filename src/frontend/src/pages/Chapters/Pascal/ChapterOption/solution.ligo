type weapon_power is map (string, int)

function main (const _p : unit; const _store : unit) : (list(operation) * unit) is
  block {
    var weapons : weapon_power :=
        map [
            "Main Laser" -> 5;
            "Right Laser" -> 2;
            "Left Laser" -> 3;
        ];

    // Type your solution below
    const main_laser_power : option(int) = weapons["Main Laser"];
    case main_laser_power of [
      Some(i) -> weapons["Main Laser"] := i + 1
    | None -> failwith("Weapon not found")
    ]

  } with ((nil: list(operation)), unit)