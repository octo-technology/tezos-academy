#define WITH_EXTRA

#include "extra.jsligo"

const removeFirst = (str: string) : string =>
    String.sub (0 as nat, 1 as nat, str);

let doSomethingInventory = (str: string) : string => {
    // Type your solution below
#if EXTRA
    return doSomethingExtra(str);
#else
    return removeFirst(str);
#endif
};

type param = | ["Apply", string];

const main = ([p, _store]: [param, string]) : [list<operation>, string] => ([
    list([]) as list<operation>, 
    match(p, {
        Apply: (str: string) => doSomethingInventory(str)
    })
]);

