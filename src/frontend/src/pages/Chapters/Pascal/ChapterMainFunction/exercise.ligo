// Modify the code below
type parameter is
  Action_A of string
| Action_B of string

type storage is record [
  stored_string_A : string;
  stored_string_B : string
]

type return is list (operation) * storage

function entry_A (const input_string : string; const store : storage) : return is
  ((nil : list (operation)), store with record [stored_string_A = input_string])

function entry_B (const input_string : string; const store : storage) : return is
  ((nil : list (operation)), store with record [stored_string_B = input_string])

function main (const action : parameter; const store : storage): return is
  case action of
    Action_A (input_string) -> entry_A (input_string, store)
  | Action_B (input_string) -> entry_B (input_string, store)
  end
