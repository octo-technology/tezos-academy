type weapon_power = map<string, int>;

let _main = (_p: unit, _store: unit) : ([list <operation>, unit]) => {
  let weapons: weapon_power =
      Map.literal(list([
        ["Main Laser", 5],
        ["Right Laser", 2],
        ["Left Laser", 3]
      ]));

  // Type your solution below

  return [
    (list([]) as list <operation>),
    unit
  ];
};
