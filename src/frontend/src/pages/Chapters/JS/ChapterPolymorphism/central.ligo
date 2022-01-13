#include "central_types.ligo"
#include "squadron_types.ligo"

const registerShip = (key: shipKey, shipAddress: address, shipName: string, shipHostile: bool, cs: centralStorage) : [list<operation>, centralStorage] => {
    const checkship: option<ship> = Map.find_opt(key, cs);
    const newCs: centralStorage = match(checkship, {
        Some: (e: ship) => failwith("ship already registered"),
        None: () => Map.add(key, { id: shipAddress, name: shipName, hostile: shipHostile }, cs) 
    });
    return [list([]) as list<operation>, newCs];
};

const sendTx = (e: ship, callbackAddress: address) : list<operation> => {
    // Type your solution below

    const listoperation: list<operation> = list([sendbackOperation]);

    return listoperation;
}

const retrieveShip = (key: shipKey, callbackAddress: address, cs: centralStorage) : [list<operation>, centralStorage] => {
    const checkship: option<ship> = Map.find_opt(key, cs);
    const listop: list<operation> = match(checkship, {
        Some: (e: ship) => sendTx(e, callbackAddress),
        None: () => failwith("no ship")
    });
    return [listop, cs];
};

const central = (action: actionCentral, cs: centralStorage) : [list<operation>, centralStorage] => match(action, {
    RegisterShip: (ar: centralStorage) => registerShip(ar.sKey, ar.sAddr, ar.sName, ar.sHostile, cs),
    RetrieveShip: (ret: centralStorage) => retrieveShip(ret.sKey, ret.callbackAddress, cs)
});
