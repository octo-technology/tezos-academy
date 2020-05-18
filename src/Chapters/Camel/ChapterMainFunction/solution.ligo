// Modify the code below
type parameter is
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

function main (const action : parameter; const store : storage): return is
  case action of
    Set_ship_code (input_string) -> set_ship_code (input_string, store)
  | Go_to (input_string) -> go_to (input_string, store)
  end
