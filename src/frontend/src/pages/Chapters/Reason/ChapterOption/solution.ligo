type weapon_power = map (string, int)

let main = ((p,store) : (unit,unit)) : (list(operation), unit) =>
{
    let weapons : weapon_power =
        Map.literal ([
            ("Main Laser", 5),
            ("Right Laser", 2),
            ("Left Laser", 3)
        ]);

    // Type your solution below
    let main_laser_power_opt : option(int) = Map.find_opt ("Main Laser", weapons);
    let increased_weapons : weapon_power = switch (main_laser_power_opt) {
        | Some (i) => Map.update ("Main Laser", (Some (i+1)), weapons)
        | None => (failwith("Weapon not found") : weapon_power)
    };
    (([]: list(operation)), store);
}