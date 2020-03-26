type ship_code is string
var my_ship : ship_code := "020433"
my_ship := "222031"
const my_ship_price : tez = 3tez * 1.20
// Type your solution below
function modify_ship (const my_ship : ship_code) : ship_code is
  block {
    const modified_ship := String.slice(0n, 2n, my_ship) ^ "1" ^  String.slice(3n, 3n, my_ship)
  } with modified_ship
