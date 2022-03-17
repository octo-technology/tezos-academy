type ship_code = string;
let my_ship: ship_code = "020433";
my_ship = "222031";
const my_ship_price : tez = 3 as tez * 1.20;

let modify_ship = (my_ship: ship_code): ship_code => {
    // Type your solution below
    let modify_ship: ship_code = my_ship;
    if (String.sub(2 as nat, 1 as nat, my_ship) == "0") {
        return  "" + String.sub(0 as nat, 2 as nat, my_ship) + "1" + String.sub(3 as nat, 3 as nat, my_ship)
    } else {
        return modify_ship;
    }
}
 

