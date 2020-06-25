#include "central_types.religo"
#include "squadron_types.religo"

let moduleRequest =((moduleName, key, callbackAddress, m): (string, string, address, modules)) : (list(operation), modules) =>
{
    let addr_opt : option(address) = Map.find_opt (moduleName,m);
    let addr : address = switch (addr_opt) {
    | Some(a) => a
    | None => (failwith("Service not registered: " ++ moduleName) : address)
    };
    // addr is the address of central smart contract
    // Type your solution below
    let proposed_destination_opt : option(contract(actionCentral)) = Tezos.get_contract_opt(addr);
    let proposed_destination : contract(actionCentral) = switch (proposed_destination_opt) {
        | Some(ci) => ci
        | None => (failwith("Unknown contract") : contract(actionCentral))
    };
    let actRetrieve: actionRetrieve = {
        sKey : key,
        callbackAddress : Tezos.self_address
    };
    let proposedTransaction : operation = Tezos.transaction( RetrieveShip(actRetrieve), 0mutez, proposed_destination);
    
    let listoperation : list(operation) = [ proposedTransaction ];
    (listoperation, m);
} 

let moduleResponse = ((e, m) : (ship, modules)) : (list(operation), modules) =>
{
    let enemy : bool = e.hostile;
    if (enemy) {
        failwith("Fire !")
    } else {
        failwith("Patrol !")
    };
    (([]: list(operation)) , m);
}

let registerModule = ((moduleName, moduleAddress, m) : (string, address, modules)): (list(operation), modules) => 
{
    let checkModule: option(address) = Map.find_opt (moduleName,m);
    let modified_storage = switch (checkModule) {
        | Some(e) => (failwith("Service already registered") : modules)
        | None => Map.add (moduleName, moduleAddress, m)
    };
    (([]: list(operation)) , modified_storage);
}

let squadron = ((action,md) : (actionSquadron, modules)) : (list(operation), modules) => { 
    switch (action) {
    | RegisterModule (m) => registerModule ((m.name, m.moduleAddress, md))
    | ModuleRequest (mr) => moduleRequest ((mr.moduleName, mr.key, mr.callbackAddress, md))
    | ModuleResponse (e) => moduleResponse ((e.e, md))
    }
}