type ship_code is string
var my_ship : ship_code := "020433"
my_ship := "222031"
const my_ship_price : tez = 3tez * 1.20

function modify_ship (const my_ship : ship_code) : ship_code is
  block {
    var modified_ship : ship_code := my_ship;
    // Type your solution below
    var i : nat := 0n;
    while i < 5n block {
        if String.sub(i, 1n, my_ship) = "2" then
          modified_ship := String.sub(0n, i, my_ship) ^ "1" ^  String.sub(i + 2n, 5n - i, my_ship)
        else skip;
        i := i + 1n
    }
  } with modified_ship