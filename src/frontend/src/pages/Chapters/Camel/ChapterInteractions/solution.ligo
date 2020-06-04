type storage = unit

type parameter =
  Fire of int
| Stop

type return = operation list * storage

let right_laser_address : address = ("tz1fND4ejogxWN7HB5JKdz119A48Cp2eYKj9" : address)
let left_laser_address : address = ("tz1PVWEWDcuow9R6y5EFwcHbFNoZBZ9RjxaB" : address)

let orders (action, store : unit * storage): return =

    let right_laser : parameter contract =
      match (Tezos.get_contract_opt(right_laser_address) : parameter contract option) with
        Some (contract) -> contract
      | None -> (failwith ("Contract not found.") : parameter contract) in
      
    let left_laser : parameter contract =
      match (Tezos.get_contract_opt(left_laser_address) : parameter contract option) with
        Some (contract) -> contract
      | None -> (failwith ("Contract not found.") : parameter contract) in
      
    // Type your solution below
    let operations : operation list = [
        Tezos.transaction (Fire 5) 0tez right_laser;
        Tezos.transaction (Stop ()) 0tez right_laser;
        Tezos.transaction (Fire 5) 0tez left_laser;
        Tezos.transaction (Stop ()) 0tez left_laser;
    ]
  in (operations, store)
