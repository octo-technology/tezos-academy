// Modify the code below
type parameter =
  Set_ship_code of string
| Go_to of string

type storage = {
  ship_code : string;
  destination : string
}

type return = operation list * storage

let set_ship_code (input_string, store : string * storage) : return =
  ([] : operation list), {store with ship_code = input_string}

let go_to (input_string, store : string * storage) : return =
  ([] : operation list), {store with destination = input_string}

let main (action, store: parameter * storage) : return =
  match action with
    Set_ship_code input_string -> set_ship_code (input_string, store)
  | Go_to input_string -> go_to (input_string, store)
