type storage = unit

type parameter =
  Fire (int)
| Stop

type return = (list(operation), storage)

let right_laser_address : address = ("tz1fND4ejogxWN7HB5JKdz119A48Cp2eYKj9" : address);
let left_laser_address : address = ("tz1PVWEWDcuow9R6y5EFwcHbFNoZBZ9RjxaB" : address);

let orders = ((action, store) : (unit, storage)): return =>
{
    let right_laser : contract(parameter) =
      switch (Tezos.get_contract_opt(right_laser_address) : option(contract(parameter))) {
        | Some (contract) => contract
        | None => (failwith ("Contract not found.") : contract(parameter))
      };
    let left_laser : contract(parameter) =
      switch (Tezos.get_contract_opt(left_laser_address) : option(contract(parameter))) {
        | Some (contract) => contract
        | None => (failwith ("Contract not found.") : contract(parameter))
      };
    // Type your solution below
    let operations : list(operation) = [
        Tezos.transaction ((Fire 5), 0tez, right_laser),
        Tezos.transaction ((Stop ()), 0tez, right_laser),
        Tezos.transaction ((Fire 5), 0tez, left_laser),
        Tezos.transaction ((Stop ()), 0tez, left_laser),
    ];
    (operations, store);
}