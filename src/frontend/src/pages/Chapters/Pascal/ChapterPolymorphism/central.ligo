#include "central_types.ligo"
#include "squadron_types.ligo"

function registerShip(const key: shipKey; const shipAddress: address; const shipName: string; const shipHostile: bool; const cs: centralStorage): (list(operation) * centralStorage) is 
  begin
    const checkship: option(ship) = cs[key];
    case checkship of
        | Some(e) -> failwith("ship already registered")
        | None -> begin
            cs[key] := record
                id = shipAddress;
                name = shipName;
                hostile = shipHostile;
            end
        end
    end
  end with ((nil: list(operation)) , cs)

function sendTx(const e: ship; const callbackAddress: address): (list(operation)) is
begin
    // Type your solution below
    
    const listoperation : list(operation) = list
        sendbackOperation
    end
end with (listoperation)

function retrieveShip(const key: shipKey; const callbackAddress: address; const cs: centralStorage): (list(operation) * centralStorage) is 
  begin
    const checkship: option(ship) = cs[key];
    var listop: list(operation) := list end;
    case checkship of
        | Some(e) -> begin
            listop := sendTx(e, callbackAddress);
        end
        | None -> failwith("no ship")
    end
  end with (listop , cs)

function central(const action : actionCentral; const cs: centralStorage) : (list(operation) * centralStorage) is 
  block {skip} with 
    case action of
    | RegisterShip (ar) -> registerShip (ar.sKey, ar.sAddr, ar.sName, ar.sHostile, cs)
    | RetrieveShip (ret) -> retrieveShip(ret.sKey, ret.callbackAddress, cs)
  end