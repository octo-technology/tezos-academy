type ship_code is string
var my_ship : ship_code := "020433"
my_ship := "222031"
const my_ship_price : tez = 3tez * 1.20

function modify_ship (const my_ship : ship_code) : ship_code is
  block {
    var modified_ship : ship_code := my_ship;
    // Type your solution below
    if String.slice(2n, 1n, name) = "2" then
      modified_ship = String.slice(0n, 2n, my_ship) ^ "1" ^  String.slice(3n, 3n, my_ship)
    else skip;
  } with modified_ship