#define WITH_EXTRA

#if WITH_EXTRA
#include "extra.religo"
#endif

let removeFirst = (str: string) : string =>
    String.sub (0n, 1n, str)

let doSomethingInventory = (str: string) : string =>
    // Type your solution below
    str

type param =  Apply (string)

let main = ((p, store): (param, string)) : (list(operation), string) =>
{
    let new_storage : string = switch (p) {
    | Apply (str) => doSomethingInventory(str)
    };
    (([]: list(operation)), new_storage)
}