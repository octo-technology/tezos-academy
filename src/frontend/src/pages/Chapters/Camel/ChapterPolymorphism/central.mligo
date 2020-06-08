#include "central_types.mligo"
#include "squadron_types.mligo"

let registerShip ((key,shipAddress, shipName, shipHostile, cs): (shipKey * address * string * bool * centralStorage)): (operation list * centralStorage) = 
    let checkship: ship option = Map.find_opt key cs in
    let modified_storage = match (checkship) with
        | Some(e) -> (failwith("ship already registered") : centralStorage)
        | None -> Map.add key {
                id = shipAddress;
                name = shipName;
                hostile = shipHostile
            } cs
    in
    (([]: operation list), modified_storage)

let sendTx ((e,callbackAddress) : (ship * address)): (operation list) =
    // Type your solution below
    let contractInterfaceOpt: actionSquadron contract option = Tezos.get_entrypoint_opt "%moduleResponse" callbackAddress in
    let contractInterface : actionSquadron contract = match (contractInterfaceOpt) with
        | Some (ci) -> ci
        | None -> (failwith("Entrypoint not found in contract Squadron"): actionSquadron contract)
    in
    let ee : actionModuleResponse = { e = e } in
    let sendbackOperation: operation = Tezos.transaction (ModuleResponse(ee)) 0mutez contractInterface in
    let listoperation : operation list = [ sendbackOperation ] in 
    listoperation

let retrieveShip ((key, callbackAddress, cs): (shipKey * address * centralStorage)) : (operation list * centralStorage) =
    let checkship: ship option = Map.find_opt key cs in 
    let listop: operation list = match (checkship) with
        | Some(e) -> sendTx((e, callbackAddress))
        | None -> (failwith("no ship") : operation list) 
    in
    (listop , cs)

let central ((action,cs) : (actionCentral * centralStorage)) : (operation list * centralStorage) = 
    match (action) with
    | RegisterShip (ar) -> registerShip ((ar.sKey, ar.sAddr, ar.sName, ar.sHostile, cs))
    | RetrieveShip (ret) -> retrieveShip ((ret.sKey, ret.callbackAddress, cs))
