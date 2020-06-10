#include "tzip/proposals/tzip-12/lib/fa2_hook_lib.mligo"
#include "tzip/proposals/tzip-12/lib/fa2_behaviors.mligo"

type storage = {
  rep : balance_of_response_michelson list
}

type request_balance_of_param = {
    at : address;
    requests : balance_of_request list;
}

type receive_balance_of_param = balance_of_response_michelson list

let request_balance (req, s : (request_balance_of_param * storage)) : operation list * storage =
    // Get the TZIP-12 contract instance 'from' the chain 
    let token_contract_balance_entrypoint_opt : balance_of_param contract option = Tezos.get_entrypoint_opt "%balance_of" req.at in
    let token_contract_balance_entrypoint : balance_of_param contract = match (token_contract_balance_entrypoint_opt) with
        | Some (ci) -> ci
        | None -> (failwith("Entrypoint not found"): balance_of_param contract)
    in

    // Callback (contract) for Balance_of will be the current contract's Receive_balance entrypoint 
    let balance_of_callback_contract_opt : receive_balance_of_param contract option = Tezos.get_entrypoint_opt "%receive_balance" Tezos.self_address in
    let balance_of_callback_contract : receive_balance_of_param contract = match (balance_of_callback_contract_opt) with
        | Some (ci) -> ci
        | None -> (failwith("Entrypoint not found"): receive_balance_of_param contract)
    in
    //let balance_of_callback_contract : receive_balance_of_param contract = get_entrypoint("%receive_balance", Tezos.self_address) in
    // Set up the parameter w/ data required for the Balance_of entrypoint
    let balance_of_operation_param : balance_of_param = {
        requests = req.requests;
        callback = balance_of_callback_contract;
    } in
    // Forge an internal transaction to the TZIP-12 contract 
    // parametrised by the prieviously prepared `balance_of_operation_param` 
    // Note: We're sending 0mutez as part of this transaction
    let balance_of_operation : operation = Tezos.transaction balance_of_operation_param 0mutez token_contract_balance_entrypoint in 
    ([ balance_of_operation ], s)

let receive_balance (received, s: (receive_balance_of_param * storage)) : operation list * storage = 
    let new_store : storage = { s with rep = received } in
    (([] : operation list), new_store)

type  entry_points =
  | Request_balance of request_balance_of_param
  | Receive_balance of receive_balance_of_param

 let main (param, s : entry_points * storage) 
    : (operation list) * storage =
  match param with
  | Request_balance request_balance_of_param -> request_balance (request_balance_of_param, s)
  | Receive_balance receive_balance_of_param -> receive_balance (receive_balance_of_param, s)
