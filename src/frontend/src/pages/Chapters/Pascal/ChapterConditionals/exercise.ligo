type ship_code is string
var my_ship : ship_code := "020433"
my_ship := "222031"
const my_ship_price : tez = 3tez * 1.20

function modify_ship (const my_ship : ship_code) : ship_code is
  block {
    // Type your solution below
    const modified_ship := String.sub(0n, 2n, my_ship) ^ "1" ^ String.sub(3n, 3n, my_ship)
  } with modified_ship