type ship_code is string
var my_ship : ship_code := "020433"
my_ship := "222031"
const my_ship_price : tez = 3tez * 1.20

function modify_ship (const my_ship : ship_code) : ship_code is
  block {
    var modified_ship : ship_code := my_ship;
    // Type your solution below
    for i := 0n to 5n block {
        if String.slice(i, 1n, name) = "2" then
          modified_ship = String.slice(0n, i, my_ship) ^ "1" ^  String.slice(i + 2n, 5n - i, my_ship)
        else skip;
    }
  } with modified_ship