#include "tzip/proposals/tzip-12/fa2_interface.mligo"
#include "tzip/proposals/tzip-12/fa2_errors.mligo"

type entity = {
    balance : nat
}
type entity_key = address * token_id
type ledger = (entity_key, entity) map

type tokens = {
    total_supply : nat;
    metadata : token_metadata;
}

type operator_ = {
    owner : address;
    operator : address;
}

type storage = { 
    paused : bool;
    ledger : ledger;
    tokens : (nat,tokens) map;
    operators : operator_ set;
    administrator : address;
}

type return = (operation list * storage)

type entry_points = 
  |  Set_pause of bool
  |  Set_administrator of address
  |  MyBalance_of of balance_of_param
  |  MyTotal_supply of total_supply_param_michelson
  |  MyToken_metadata of token_metadata_param_michelson
  |  MyTransfer of transfer_michelson list

let set_pause(param,s : bool * storage): return =
    if Tezos.sender = s.administrator then
        (([] : operation list), { s with paused=param })
    else 
        (failwith("only admin can do it") : return)

let set_administrator(param,s : address * storage): return =
    if Tezos.sender = s.administrator then
        (([] : operation list), { s with administrator=param })
    else 
        (failwith("only admin can do it") : return)

let balance_of (balance_of_param, s : balance_of_param * storage) : return =
    let get_balance = fun ( i : balance_of_request) -> match Map.find_opt (i.owner,i.token_id) s.ledger with
        | Some e -> { request = i ; balance =e.balance }
        | None -> (failwith("unknown owner") : balance_of_response)
    in
    let balance_of_callback_param : balance_of_response list = List.map get_balance balance_of_param.requests in
    let convert = fun ( r : balance_of_response) -> Layout.convert_to_right_comb(({request=Layout.convert_to_right_comb( r.request ); balance=r.balance} : balance_of_response_aux)) in
    let balance_of_callback_param_michelson : balance_of_response_michelson list = List.map convert balance_of_callback_param in
    // sending back the processed map of balance requests/responses
    let destination: (balance_of_response_michelson list) contract = balance_of_param.callback in
    let balance_of_response_operation : operation = Tezos.transaction balance_of_callback_param_michelson 0mutez destination in
    ([balance_of_response_operation], s)

let total_supply(params, s: total_supply_param_michelson * storage) : return =
    if s.paused = true then
        (failwith("contract in pause") : return)
    else 
        let p : total_supply_param = Layout.convert_from_right_comb(params: total_supply_param_michelson) in
        let token_ids : token_id list = p.token_ids in 
        let get_total_supply = fun ( i : token_id) -> match Map.find_opt i s.tokens with
            | Some v -> { token_id = i ; total_supply =v.total_supply }
            | None -> (failwith("unknown token_id") : total_supply_response)
        in
        let responses : total_supply_response list = List.map get_total_supply token_ids in 
        let convert = fun ( r : total_supply_response) -> Layout.convert_to_right_comb(r) in
        let ret : total_supply_response_michelson list = List.map convert responses in 
        let destination: (total_supply_response_michelson list) contract = p.callback in
        let op : operation = Tezos.transaction ret 0mutez destination in
        ([ op ], s)

let token_metadata(params, s: token_metadata_param_michelson * storage) : return =
    if s.paused = true then
        (failwith("contract in pause") : return)
    else 
        let p : token_metadata_param = Layout.convert_from_right_comb(params: token_metadata_param_michelson) in
        let token_ids : token_id list = p.token_ids in 
        let get_metadata = fun ( i : token_id) -> match Map.find_opt i s.tokens with
            | Some v -> v.metadata
            | None -> (failwith("unknown token_id") : token_metadata)
        in
        let responses : token_metadata list = List.map get_metadata token_ids in 
        let convert = fun ( r : token_metadata) -> Layout.convert_to_right_comb(r) in
        let ret : token_metadata_michelson list = List.map convert responses in 
        let destination: (token_metadata_michelson list) contract = p.callback in
        let op : operation = Tezos.transaction ret 0mutez destination in
        ([ op ], s)

let transfer(params, s: transfer_michelson list * storage) : return =
    if s.paused = true then
        (failwith("contract in pause") : return)
    else 
        let apply_transfer = fun (l,i : ledger * transfer_michelson) -> 
            let t_aux : transfer_aux = Layout.convert_from_right_comb(i: transfer_michelson) in
            let from_ : address = t_aux.from_ in
            let result_ledger : ledger = if Tezos.sender = from_ or Tezos.sender = s.administrator then
                if Set.mem {owner=from_;operator=Tezos.sender} s.operators then
                    let transfers : transfer_destination_michelson list = t_aux.txs in
                    let apply_transfer_destination = fun (acc,j : (ledger * transfer_destination_michelson)) ->
                        let transfer_destination : transfer_destination = Layout.convert_from_right_comb(j: transfer_destination_michelson) in 
                        let tr_amount : nat = transfer_destination.amount in 
                        let to_ : address = transfer_destination.to_ in
                        let tokenid : token_id = transfer_destination.token_id in
                        let temp_state_ledger : ledger = if tr_amount > 0n then
                            let enough_funds : bool = match Map.find_opt (from_,tokenid) acc with
                                | Some bal -> (bal.balance >= tr_amount)
                                | None -> false
                            in
                            if enough_funds then
                                let l_updated_from : ledger = match Map.find_opt (from_,tokenid) acc with
                                | Some bal -> Map.update (from_,tokenid) (Some {balance=abs(bal.balance - tr_amount)} ) acc 
                                | None -> (failwith("should not arrive here") : ledger)
                                in
                                let l_updated_from_to : ledger = match Map.find_opt (to_,tokenid) l_updated_from with
                                | Some bal -> Map.update (to_,tokenid) (Some {balance=bal.balance + tr_amount}) l_updated_from 
                                | None -> Map.add (to_,tokenid) {balance=tr_amount} l_updated_from
                                in
                                l_updated_from_to
                            else
                                (failwith(insufficient_balance) : ledger)
                        else
                            (failwith("transferring nothing !") : ledger)
                        in 
                        temp_state_ledger
                    in
                    let result : ledger = List.fold apply_transfer_destination transfers l in
                    result
                else
                    (failwith(not_operator) : ledger)
            else
                (failwith(not_owner) : ledger)
            in
            result_ledger
        in
        let new_ledger : ledger = List.fold apply_transfer params s.ledger in
        (([] : operation list), new_ledger)


let main (p,s : entry_points * storage) : return =
    match p with
    | MyTotal_supply p -> total_supply (p,s)
    | MyBalance_of p -> balance_of (p,s)
    | MyToken_metadata p -> token_metadata (p,s)
    | Set_pause p -> set_pause (p,s)
    | Set_administrator p -> set_administrator (p,s)
    | MyTransfer l -> transfer (l, s)