type storage = int;

type parameter =
| ["Fire", int]
| ["Stop"];

type return_ = [list<operation>, storage];

type action = ["Order"] | ["Nothing"];

const right_laser_address: address = "tz1fND4ejogxWN7HB5JKdz119A48Cp2eYKj9" as address;
const left_laser_address: address = "tz1PVWEWDcuow9R6y5EFwcHbFNoZBZ9RjxaB" as address;

let orders = (_param: unit, s: storage) : return_ => {
  const right_laser: contract<parameter> = match(
    Tezos.get_contract_opt(right_laser_address) as option<contract<parameter>>, {
        Some: (contract: option<contract<parameter>>) => contract,
        None: () => failwith("Contract not found.") 
    });
  const left_laser: contract<parameter> = match(
    Tezos.get_contract_opt(left_laser_address) as option<contract<parameter>>, {
        Some: (contract: option<contract<parameter>>) => contract,
        None: () => failwith("Contract not found.") 
    });

  // Type your solution below

  return [operations, s];
};

let main = (a: action, s: storage) : return_ => {
  return 
    (match (a, {
     Order: () => orders(unit, s), 
     Nothing: () => [list([]) as list <operation>, s]
   }))
};
