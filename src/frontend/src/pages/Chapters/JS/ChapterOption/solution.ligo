type weapon_power = map<string, int>;

let _main = (_p: unit, _store: unit) : ([list <operation>, unit]) => {
  let weapons: weapon_power =
      Map.literal(list([
        ["Main Laser", 5],
        ["Right Laser", 2],
        ["Left Laser", 3]
      ]));

  // Type your solution below
  let main_laser_power: option<int> = Map.find_opt("Main Laser", weapons);

  weapons = match(main_laser_power, {
    Some: i => Map.update("Main Laser", Some(i + 1), weapons), 
    None: () => failwith("Weapon not found")
  });

  return [
    (list([]) as list <operation>),
    unit
  ];
};
