type storage is unit

type parameter is
  Fire of int
| Stop

type return is list (operation) * storage

const right_laser_address : address = ("tz1fND4ejogxWN7HB5JKdz119A48Cp2eYKj9" : address)
const left_laser_address : address = ("tz1PVWEWDcuow9R6y5EFwcHbFNoZBZ9RjxaB" : address)

function orders (const action : parameter; const store : storage): return is
  block {
    const right_laser : contract (action) =
      case (Tezos.get_contract_opt(main_laser_address) : option (contract (parameter))) of
        Some (contract) -> contract
      | None -> (failwith ("Contract not found.") : contract (parameter))
      end;
    const left_laser : contract (action) =
      case (Tezos.get_contract_opt(main_laser_address) : option (contract (parameter))) of
        Some (contract) -> contract
      | None -> (failwith ("Contract not found.") : contract (parameter))
      end;

    // Type your solution below

  } with (operations, store)
