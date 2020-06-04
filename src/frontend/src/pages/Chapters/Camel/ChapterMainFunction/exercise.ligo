// Modify the code below
type parameter =
  Action_A of nat
| Action_B of string

type storage = {
  counter : nat;
  name    : string
}

type return = operation list * storage

let entry_A (n, store : nat * storage) : return =
  ([] : operation list), {store with counter = n}

let entry_B (s, store : string * storage) : return =
  ([] : operation list), {store with name = s}

let main (action, store: parameter * storage) : return =
  match action with
    Action_A n -> entry_A (n, store)
  | Action_B s -> entry_B (s, store)
