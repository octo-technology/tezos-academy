#include "central_types.ligo"
#include "squadron_types.ligo"

const moduleRequest = (moduleName: string, key: string, callbackAddress: address, m: modules) : [list<operation>, modules] => {
    const addr_opt: option<address> = Map.find_opt(moduleName, m);
    const addr: address = match(addr_opt, {
        Some: (a: address) => a,
        None: () => failwith("Service not registered: " + moduleName) as address 
    });
    const proposed_destination: contract<actionCentral> = Tezos.get_contract_with_error(addr, "Failed do get contract");
    const actRetrieve = {
        sKey: key,
        callbackAddress: Tezos.self_address
    };
    const proposedTransaction: operation = Tezos.transaction(RetrieveShip(actRetrieve), 0 as mutez, proposed_destination);
    const listoperation: list<operation> = list([proposedTransaction]);
    return [listoperation, m];
};

const moduleResponse = (e: ship, m: modules) : [list<operation>, modules] => {
    const enemy: bool = e.hostile;
    if (enemy) {
        failwith("Fire !") as [list<operation>, modules] 
    } else {
        failwith("Patrol !") as [list<operation>, modules]  
    }
    return [list([]) as list<operation>, m];
};

const registerModule = (moduleName: string, moduleAddress: address, m: modules): [list<operation>, modules] => {
    const checkModule: option<address> = Map.find_opt(moduleName, m);
    const newModules: modules = match(checkModule, {
        Some: (e: string) => failwith("Service already registered"),
        None: () => Map.add(moduleName, moduleAddress, m)
    }); 
    return [list([]) as list<operation>, newModules];
};

const squadron = (action: actionSquadron, md: modules) : [list<operation>, modules] => match(action, {
  RegisterModule: (m: modules) => registerModule(m.name, m.moduleAddress, md),
  ModuleRequest: (mr: modules) => moduleRequest(mr.moduleName, mr.key, mr.callbackAddress, md),
  ModuleResponse: (e: modules) => moduleResponse(e.e, md)
});
