#include "central_types.ligo"
#include "squadron_types.ligo"

function moduleRequest(const moduleName: string; const key: string; const _callbackAddress: address; const m: modules) : (list(operation) * modules) is
begin
    const addr_opt : option(address) = m[moduleName];
    const addr : address = case addr_opt of [
    | Some(a) -> a
    | None -> (failwith("Service not registered: " ^ moduleName) : address)
    ];
    // addr is the address of central smart contract
    // Type your solution below
    const proposed_destination : contract(actionCentral) = get_contract(addr);
    const actRetrieve: actionRetrieve = record [
        sKey = key;
        callbackAddress = self_address;
    ];
    const proposedTransaction : operation = transaction( RetrieveShip(actRetrieve), 0mutez, proposed_destination);
    
    const listoperation : list(operation) = list [
        proposedTransaction
    ]
end with (listoperation, m) 

function moduleResponse(const e: ship; const m: modules) : (list(operation) * modules) is
begin
  const enemy : bool = e.hostile;
  if enemy then
    failwith("Fire !")
  else
    failwith("Patrol !")
end with ((nil: list(operation)) , m)

function registerModule(const moduleName: string; const moduleAddress: address; var m: modules): (list(operation) * modules) is 
  begin
    const checkModule: option(address) = m[moduleName];
    case checkModule of [
        | Some(_e) -> failwith("Service already registered")
        | None -> begin
            m[moduleName] := moduleAddress;
        end
    ]
  end with ((nil: list(operation)) , m)


function squadron(const action : actionSquadron; const md: modules) : (list(operation) * modules) is 
  block {skip} with 
    case action of [
    | RegisterModule (m) -> registerModule(m.name, m.moduleAddress, md)
    | ModuleRequest (mr) -> moduleRequest(mr.moduleName, mr.key, mr.callbackAddress, md)
    | ModuleResponse (e) -> moduleResponse(e.e, md)
    ]