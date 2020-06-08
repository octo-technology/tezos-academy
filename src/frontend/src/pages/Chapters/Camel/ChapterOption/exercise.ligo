type weapon_power = (string, int) map
type storage = weapon_power

let  main (p,store : unit * storage) : (operation list * storage) =
  let weapons : weapon_power = Map.add "Main Laser" 5 store in
    // Type your solution below

      in (([]: operation list), increased_weapons)