#define WITH_EXTRA

#if WITH_EXTRA
#include "extra.ligo"
#endif

function removeFirst (const str: string) : string is
    String.sub (0n, 1n, str)

function doSomethingInventory (const str: string) : string is
    // Type your solution below
    str

type param is Apply of string

function main (const p : param; const store : string) : list(operation)* string is
block {
    const new_storage : string = case (p) of
    | Apply (str) -> doSomethingInventory(str)
    end
    
} with ((nil: list(operation)), new_storage)