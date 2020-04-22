// Modify the code below
type action is
  Set_ship_code of string
| Go_to of string

type storage is record [
  ship_code : string;
  destination : string
]

type return is list (operation) * storage

function set_ship_code (const input_string : string; const store : storage) : return is
  ((nil : list (operation)), store with record [ship_code = input_string])

function go_to (const input_string : string; const store : storage) : return is
  ((nil : list (operation)), store with record [destination = input_string])

function main (const input_action : action; const store : storage): return is
  case input_action of
    Set_ship_code (input_string) -> set_ship_code (input_string, store)
  | Go_to (input_string) -> go_to (input_string, store)
  end
