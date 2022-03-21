// Type your solution below
type item =

type parameter = ChangeItem (item)
type storage = item
type return_ = (list(operation), item)

let changeItem = ((i, _s) : (item, storage)) : return_ => 
    (([] : list(operation)), i)


let main = ((p, s) : (parameter, storage)) : return_ => 
    switch (p) {
    | ChangeItem (i) => changeItem(i, s) 
    }