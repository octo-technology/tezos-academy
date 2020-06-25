#include "central_types.religo"
#include "squadron_types.religo"

let registerShip = ((key,shipAddress, shipName, shipHostile, cs): (shipKey, address, string, bool, centralStorage)): (list(operation), centralStorage) => 
{    
    let checkship: option(ship) = Map.find_opt (key,cs);
    let modified_storage = switch (checkship) {
        | Some(e) => (failwith("ship already registered") : centralStorage)
        | None => Map.add (key, {
                id : shipAddress,
                name : shipName,
                hostile : shipHostile
            }, cs)
    };
    (([]: list(operation)) , modified_storage);
}

let sendTx = ((e,callbackAddress) : (ship, address)): (list(operation)) =>
{
    // Type your solution below

    let listoperation : list(operation) = [ sendbackOperation ];
    listoperation;
}

let retrieveShip = ((key, callbackAddress, cs): (shipKey, address, centralStorage)) : (list(operation), centralStorage) => 
{
    let checkship: option(ship) = Map.find_opt (key, cs);
    let listop: list(operation) = switch (checkship) {
        | Some(e) => sendTx((e, callbackAddress))
        | None => (failwith("no ship") : list(operation)) 
    };
    (listop , cs);
}

let central = ((action,cs) : (actionCentral, centralStorage)) : (list(operation), centralStorage) => 
{
    switch (action) {
    | RegisterShip (ar) => registerShip ((ar.sKey, ar.sAddr, ar.sName, ar.sHostile, cs))
    | RetrieveShip (ret) => retrieveShip ((ret.sKey, ret.callbackAddress, cs))
    }
}