#include "central_types.mligo"
#include "squadron_types.mligo"

let moduleRequest ((moduleName, key, callbackAddress, m): (string * string * address * modules)) : (operation list * modules) =
    let addr_opt : address option = Map.find_opt moduleName m in
    let addr : address = match (addr_opt) with
    | Some(a) -> a
    | None -> (failwith("Service not registered: " ^ moduleName) : address)
    in
    // addr is the address of central smart contract
    // Type your solution below
    let proposed_destination_opt : actionCentral contract option = Tezos.get_contract_opt addr in
    let proposed_destination : actionCentral contract = match (proposed_destination_opt) with
        | Some(ci) -> ci
        | None -> (failwith("Unknown contract") : actionCentral contract)
    in
    let actRetrieve: actionRetrieve = {
        sKey = key;
        callbackAddress = Tezos.self_address
    } in
    let proposedTransaction : operation = Tezos.transaction (RetrieveShip(actRetrieve)) 0mutez proposed_destination in
    
    let listoperation : operation list = [ proposedTransaction ] in
    (listoperation, m)

let moduleResponse ((e, m) : (ship * modules)) : (operation list * modules) =
    let enemy : bool = e.hostile in
    let executeorder : unit = if (enemy) then
        failwith ("Fire !") 
    else
        failwith ("Patrol !")
    in
    (([]: operation list) , m)

let registerModule ((moduleName, moduleAddress, m) : (string * address * modules)): (operation list * modules) =
    let checkModule: address option = Map.find_opt moduleName m in
    let modified_storage = match (checkModule) with
        | Some(e) -> (failwith("Service already registered") : modules)
        | None -> Map.add moduleName moduleAddress m
    in
    (([]: operation list) , modified_storage)

let squadron ((action,md) : (actionSquadron * modules)) : (operation list * modules) =
    match (action) with
    | RegisterModule (m) -> registerModule ((m.name, m.moduleAddress, md))
    | ModuleRequest (mr) -> moduleRequest ((mr.moduleName, mr.key, mr.callbackAddress, md))
    | ModuleResponse (e) -> moduleResponse ((e.e, md))
