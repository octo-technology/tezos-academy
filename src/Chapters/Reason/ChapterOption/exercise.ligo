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

    (([]: list(operation)), store);
}