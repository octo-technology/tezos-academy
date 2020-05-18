type weapon_power is map (string, int)

function main (const p : unit; const store : unit) : (list(operation) * unit) is
  block {
    const weapons : weapon_power =
        map [
            "Main Laser" -> 5;
            "Right Laser" -> 2;
            "Left Laser" -> 3;
        ];

    // Type your solution below
    

  } with ((nil: list(operation)), unit)