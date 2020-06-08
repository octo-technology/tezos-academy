type weapon_power = (string, int) map
type storage = weapon_power

let  main (p,store : unit * storage) : (operation list * storage) =
  let weapons : weapon_power = Map.add "Main Laser" 5 store in
    // Type your solution below
    let main_laser_power_opt : int option = Map.find_opt "Main Laser" weapons in
      let increased_weapons : weapon_power = match main_laser_power_opt with
        Some i -> Map.update "Main Laser" (Some (i+1)) weapons
        | None -> (failwith("Weapon not found") : weapon_power)
      in (([]: operation list), increased_weapons)