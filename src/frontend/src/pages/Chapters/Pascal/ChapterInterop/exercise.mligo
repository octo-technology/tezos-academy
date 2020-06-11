type item is record [
  item_id : nat;
  cost : nat;
  name : string
]

type item_michelson is michelson_pair_right_comb(item)

type storage is record [ 
    inventory : list(item_michelson)
]

type return is (list(operation) * storage)

type entry_points is 
  |  AddInventory of list(item)

// This function takes a list of item as parameter and transform each item in a right combed pair structure and add this transformed item in inventory
function addInventory (const params : list(item); const s : storage) : return is
block {
    const item_list : list(item) = params;
    // Type your solution below
    
    s.inventory := List.fold(update_inventory, item_list, s.inventory);
} with ((nil : list(operation)), s)

function main (const p : entry_points; const s : storage) : return is
    case (p) of
    | AddInventory(p) -> addInventory(p,s)
    end