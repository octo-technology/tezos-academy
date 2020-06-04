type ship_code is string
var my_ship : ship_code := "020433"
// Type your solution below
my_ship := String.sub(0n, 2n, my_ship) ^ "1" ^ String.sub(3n, 3n, my_ship)
