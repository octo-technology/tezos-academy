 // Type your solution below
type item = 

type parameter = ChangeItem of item
type storage = item
type return_ = operation list * item

let changeItem (i, _s : item * storage) : return_ = 
    (([] : operation list), i)


let main (p, s : parameter * storage) : return_ = 
    match p with 
        ChangeItem (i) -> changeItem(i, s) 
