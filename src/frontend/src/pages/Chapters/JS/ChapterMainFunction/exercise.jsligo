// Modify the code below
type parameter =
| ["Action_A", string]
| ["Action_B", string];

type storage = {
  stored_string_A: string,
  stored_string_B: string
};

type return_ = [list<operation>, storage];

let action_A = ([input_string, store]: [string, storage]): return_ =>
  [(list([]) as list<operation>), {...store, stored_string_A: input_string}];

let action_B = ([input_string, store]: [string, storage]): return_ =>
  [(list([]) as list<operation>), {...store, stored_string_B: input_string}];

let main = ([action, store]: [parameter, storage]): return_ =>
  match(action, {
    Action_A: (input_string: string) => action_A([input_string, store]),
    Action_B: (input_string: string) => action_B([input_string, store])
  });
