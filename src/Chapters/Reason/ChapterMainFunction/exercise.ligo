// Modify the code below
type parameter =
  Action_A (string)
| Action_B (string)

type storage = {
  stored_string_A : string,
  stored_string_B : string
}

type return = (list (operation), storage);

let entry_A = ((input_string,store) : (string,storage)) : return =>
  (([] : list (operation)), { ...store, stored_string_A : input_string });

let entry_B = ((input_string,store) : (string,storage)) : return =>
  (([] : list (operation)), { ...store, stored_string_B : input_string });

let main = ((action,store) : (parameter,storage)): return =>
  switch (action) {
  | Action_A (input_string) => entry_A ((input_string, store))
  | Action_B (input_string) => entry_B ((input_string, store))
  };