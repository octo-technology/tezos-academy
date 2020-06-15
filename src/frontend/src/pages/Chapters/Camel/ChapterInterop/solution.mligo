type item = {
  item_id : nat;
  cost : nat;
  name : string
}

type item_michelson = item michelson_pair_right_comb

type storage = { 
    inventory : item_michelson list;
}

type return = (operation list * storage)

type entry_points = 
  |  AddInventory of item list

// This function takes a list of item as parameter and transform each item in a right combed pair structure and add this transformed item in inventory
let addInventory(params, s: item list * storage) : return =
    let item_list : item list = params in 
    // Type your solution below
    let update_inventory = fun (acc,i : item_michelson list * item) -> Layout.convert_to_right_comb(i) :: acc in
    let new_inventory : item_michelson list = List.fold update_inventory item_list s.inventory in
    (([] : operation list), {s with inventory=new_inventory})

let main (p,s : entry_points * storage) : return =
    match p with
    | AddInventory p -> addInventory (p,s)