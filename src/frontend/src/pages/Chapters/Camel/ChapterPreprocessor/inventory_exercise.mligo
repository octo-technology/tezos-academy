#define WITH_EXTRA

#if WITH_EXTRA
#include "extra.mligo"
#endif

let removeFirst (str: string) : string =
    String.sub 0n 1n str

let doSomethingInventory (str: string) : string =
    // Type your solution below
    str

type param =  Apply of string

let main (p, store: param * string) : operation list * string =
    let new_storage : string = match p with
    | Apply str -> doSomethingInventory str
    in (([]: operation list), new_storage)