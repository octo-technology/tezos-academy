// Fa2 Client contract
#include "tzip-12/fa2_interface.religo"

type storage = {
  rep : list(balanceOfResponseMichelson)
}

type request_balance_of_param = {
    at : address,
    requests : list(balanceOfRequest)
}

type receive_balance_of_param = list(balanceOfResponseMichelson)

type entry_points =
  | Request_balance (request_balance_of_param)
  | Receive_balance (receive_balance_of_param)

let request_balance = ((req, s) : (request_balance_of_param, storage)) : (list(operation), storage) =>
{
    // Get the TZIP-12 contract instance 'from' the chain 
    let token_contract_balance_entrypoint_opt : option(contract(balanceOfParameterMichelson)) = Tezos.get_entrypoint_opt ("%balance_of", req.at) ;
    let token_contract_balance_entrypoint : contract(balanceOfParameterMichelson) = switch (token_contract_balance_entrypoint_opt) {
        | Some (ci) => ci
        | None => (failwith("Entrypoint not found"): contract(balanceOfParameterMichelson))
    };

    // Callback (contract) for Balance_of will be the current contract's Receive_balance entrypoint 
    let balance_of_callback_contract_opt : option(contract(receive_balance_of_param)) = Tezos.get_entrypoint_opt ("%receive_balance", Tezos.self_address);
    let balance_of_callback_contract : contract(receive_balance_of_param) = switch (balance_of_callback_contract_opt) {
        | Some (ci) => ci
        | None => (failwith("Entrypoint not found"): contract(receive_balance_of_param))
    };

    // Set up the parameter w/ data required for the Balance_of entrypoint
    let convert = (i : balanceOfRequest) : balanceOfRequestMichelson => Layout.convert_to_right_comb(i); 
    let request_michelson : list(balanceOfRequestMichelson) = List.map (convert, req.requests);
    let balance_of_operation_param : balanceOfParameterAuxiliary = {
        requests : request_michelson,
        callback : balance_of_callback_contract,
    };
    let reqPayload : balanceOfParameterMichelson = Layout.convert_to_right_comb(balance_of_operation_param);
    // Forge an internal transaction to the TZIP-12 contract from balance_of_operation_param. We're sending 0mutez as part of this transaction
    let balance_of_operation : operation = Tezos.transaction (reqPayload, 0mutez, token_contract_balance_entrypoint);
    ([ balance_of_operation ], s)
}

let receive_balance = ((received, s): (receive_balance_of_param, storage)) : (list(operation), storage) =>
{
    let new_store : storage = { ...s, rep : received };
    (([] :list( operation)), new_store)
}

let main = ((param, s) : (entry_points , storage)) : (list(operation), storage) =>
{
  switch (param) {
    | Request_balance request_balance_of_param => request_balance ((request_balance_of_param, s))
    | Receive_balance receive_balance_of_param => receive_balance ((receive_balance_of_param, s))
  }
}