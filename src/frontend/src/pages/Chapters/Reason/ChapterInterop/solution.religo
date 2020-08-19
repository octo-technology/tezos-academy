type item = {
  item_id : nat,
  cost : nat,
  name : string
}

type item_michelson = michelson_pair_right_comb(item)

type storage = { 
    inventory : list(item_michelson)
}

type return = (list(operation), storage)

type entry_points = 
  |  AddInventory (list(item))

// This function takes a list of item as parameter and transform each item in a right combed pair structure and add this transformed item in inventory
let addInventory = ((params,s) : (list(item), storage)) : return =>
{
    let item_list : list(item) = params;
    // Type your solution below
    let update_inventory = ((acc,i) : (list(item_michelson), item)) : list(item_michelson) => [Layout.convert_to_right_comb(i),...acc];
    let new_inventory : list(item_michelson) = List.fold(update_inventory, item_list, s.inventory);
    (([] : list(operation)), {...s, inventory:new_inventory})
};

let main  = ((p,s) : (entry_points, storage)) : return =>
    switch (p) {
    | AddInventory(p) => addInventory((p,s))
    }