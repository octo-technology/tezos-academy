#include "tzip/proposals/tzip-12/lib/fa2_hook_lib.mligo"
#include "tzip/proposals/tzip-12/lib/fa2_behaviors.mligo"

type storage = {
  fa2_registry : fa2_registry;
  descriptor : permissions_descriptor;
  rep : balance_of_response_michelson list
}

type request_balance_of_param = {
    at : address;
    requests : balance_of_request list;
}

type receive_balance_of_param = balance_of_response_michelson list

let request_balance (req, s : (request_balance_of_param * storage)) : operation list * storage =
    // Get the TZIP-12 contract instance 'from' the chain 
    let token_contract_balance_entrypoint_opt : balance_of_param_michelson contract option = Tezos.get_entrypoint_opt "%balance_of" req.at in
    let token_contract_balance_entrypoint : balance_of_param_michelson contract = match (token_contract_balance_entrypoint_opt) with
        | Some (ci) -> ci
        | None -> (failwith("Entrypoint not found"): balance_of_param_michelson contract)
    in

    // Callback (contract) for Balance_of will be the current contract's Receive_balance entrypoint 
    let balance_of_callback_contract_opt : receive_balance_of_param contract option = Tezos.get_entrypoint_opt "%receive_balance" Tezos.self_address in
    let balance_of_callback_contract : receive_balance_of_param contract = match (balance_of_callback_contract_opt) with
        | Some (ci) -> ci
        | None -> (failwith("Entrypoint not found"): receive_balance_of_param contract)
    in
    //let balance_of_callback_contract : receive_balance_of_param contract = get_entrypoint("%receive_balance", Tezos.self_address) in
    // Set up the parameter w/ data required for the Balance_of entrypoint
    let convert = fun (i : balance_of_request) -> Layout.convert_to_right_comb(i) in 
    let request_michelson : balance_of_request_michelson list = List.map convert req.requests in
    let balance_of_operation_param : balance_of_param_aux = {
        requests = request_michelson;
        callback = balance_of_callback_contract;
    } in
    let reqPayload : balance_of_param_michelson = Layout.convert_to_right_comb(balance_of_operation_param) in
    // Forge an internal transaction to the TZIP-12 contract 
    // parametrised by the prieviously prepared `balance_of_operation_param` 
    // Note: We're sending 0mutez as part of this transaction
    let balance_of_operation : operation = Tezos.transaction reqPayload 0mutez token_contract_balance_entrypoint in 
    ([ balance_of_operation ], s)

let receive_balance (received, s: (receive_balance_of_param * storage)) : operation list * storage = 
    let new_store : storage = { s with rep = received } in
    (([] : operation list), new_store)

type  entry_points =
  | Request_balance of request_balance_of_param
  | Receive_balance of receive_balance_of_param
  | Tokens_transferred_hook of transfer_descriptor_param_michelson
  | Register_with_fa2 of fa2_with_hook_entry_points contract

 let main (param, s : entry_points * storage) 
    : (operation list) * storage =
  match param with
  | Tokens_transferred_hook pm ->
    let p = transfer_descriptor_param_from_michelson pm in
    let u = validate_hook_call (p.fa2, s.fa2_registry) in
    let ops = standard_transfer_hook (
      {ligo_param = p; michelson_param = pm}, s.descriptor) in
    ops, s

  | Register_with_fa2 fa2 ->
    let op , new_registry = register_with_fa2 (fa2, s.descriptor, s.fa2_registry) in
    let new_s = { s with fa2_registry = new_registry; } in
    [op], new_s

  | Request_balance request_balance_of_param -> request_balance (request_balance_of_param, s)
  | Receive_balance receive_balance_of_param -> receive_balance (receive_balance_of_param, s)
