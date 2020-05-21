// Modify the code below
type parameter =
  Set_ship_code (string)
| Go_to (string)

type storage = {
  ship_code : string,
  destination : string
}

type return = (list (operation), storage);

let set_ship_code = ((input_string,store) : (string,storage)) : return =>
  (([] : list (operation)), { ...store, ship_code : input_string });

let go_to = ((input_string,store) : (string,storage)) : return =>
  (([] : list (operation)), { ...store, destination : input_string });

let main = ((action,store) : (parameter,storage)): return =>
  switch (action) {
  | Set_ship_code (input_string) => set_ship_code ((input_string, store))
  | Go_to (input_string) => go_to ((input_string, store))
  };