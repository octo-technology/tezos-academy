type ship_code = string
let my_ship : ship_code = "020433";
let my_ship = "222031";

let modify_ship = (my_ship : ship_code) : ship_code => {
  // Type your solution below
  let modified_ship = String.sub(0n, 2n, my_ship) ++ "1" ++ String.sub(3n, 3n, my_ship);
  modified_ship;
};
