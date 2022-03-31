 // Type your solution below
type item is
[@layout:comb]
record [
    cost: nat;
    item_id: nat; 
    name: string
]

type parameter is ChangeItem of item
type storage is item
type return_ is  list(operation) * item

function changeItem (const i : item; const _s : storage) : return_ is 
    ((nil : list(operation)), i)


function main (const p : parameter; const s : storage) : return_ is 
    case p of [
        ChangeItem (i) -> changeItem(i, s) 
    ]