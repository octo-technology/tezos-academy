#include "tzip/proposals/tzip-12/fa2_interface.mligo"
#include "tzip/proposals/tzip-12/fa2_errors.mligo"

type entity = {
    code : string;
    name : string;
}
type entity_id = nat
type entity_key = (entity_id * token_id)
type entities = (entity_key, entity) map
type entityIndexToOwner = (entity_key, address) map
type owner_entities = (address, entity_key set) map
//type owner_entities_count =  (address, nat) map

type token = {
    total_supply : nat;
    metadata : token_metadata;
}

type storage = { 
    paused : bool;
    entities : entities;
    entity_owner : entityIndexToOwner;
    owner_entities : owner_entities;
    tokens : (token_id,token) map;
    operators : operator_param set;
    administrator : address;
    permissions_descriptor : permissions_descriptor_aux;
}

type return = (operation list * storage)

type entry_points = 
  |  Set_pause of bool
  |  Set_administrator of address
  |  Mint of (entity * address * token_id)

type total_entry_points = (fa2_entry_points, "fa2_ep", entry_points, "specific_ep") michelson_or

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

let mint (param,s : (entity * address * token_id) * storage) : return =
    if Tezos.sender = s.administrator then
        let new_ent : entity = param.0 in
        let owner : address = param.1 in
        let tokenid : token_id = param.2 in
        // NEVER burn an entity or entity_id will be provided an existing id (mint burn mint)
        let newid : entity_id = match Map.find_opt tokenid s.tokens with
        | Some tok -> tok.total_supply + 1n
        | None -> (failwith("unknown token_id") : nat)
        in
        // entities[newid] = new_ent
        let new_entities : entities = match Map.find_opt (newid,tokenid) s.entities with 
        | Some v -> (failwith("token already exist") : entities)
        | None -> Map.add (newid,tokenid) new_ent s.entities 
        in
        // entity_owner[(newid,tokenid)] = owner
        let new_entityIndexToOwner : entityIndexToOwner = match Map.find_opt (newid,tokenid) s.entity_owner with 
        | Some addr -> (failwith("already owned") : entityIndexToOwner)
        | None -> Map.add (newid,tokenid) owner s.entity_owner
        in
        // owner_entities[owner] = Set.add (newid,tokenid) owner_entities[owner] 
        let new_owner_entities : owner_entities = match Map.find_opt owner s.owner_entities with 
        | Some et_s -> Map.update owner (Some (Set.add (newid,tokenid) et_s)) s.owner_entities
        | None -> Map.add owner (Set.add (newid,tokenid) Set.empty) s.owner_entities
        in
        // total_supply + 1
        let new_tokens : (token_id,token) map = match Map.find_opt tokenid s.tokens with 
        | Some tok -> Map.update tokenid (Some {tok with total_supply=tok.total_supply+1n}) s.tokens
        | None -> (failwith("unknown token_id") : (token_id,token) map)
        in

        (([] : operation list), { s with entities=new_entities; entity_owner=new_entityIndexToOwner; owner_entities=new_owner_entities; tokens=new_tokens})
    else 
        (failwith("only admin can do it") : return)

let balance_of (param, s : balance_of_param_michelson * storage) : return =
    let param_bo_aux : balance_of_param_aux = Layout.convert_from_right_comb(param: balance_of_param_michelson) in
    let get_balance = fun ( i : balance_of_request_michelson) -> 
        let bor : balance_of_request = Layout.convert_from_right_comb(i) in
        match Map.find_opt bor.owner s.owner_entities with
        | Some et_s ->
            let requested_token_id : token_id = bor.token_id in
            // loop on et_s set of (entity_id * token_id)
            let compute_balance = fun (acc,et : (nat * entity_key)) -> 
                if et.1 = requested_token_id then
                    acc + 1n
                else
                    acc
            in
            let computed_balance : nat = Set.fold compute_balance et_s 0n in  
            { request = Layout.convert_to_right_comb(bor) ; balance =computed_balance }
        | None -> (failwith("unknown owner") : balance_of_response_aux)
    in
    let balance_of_callback_param : balance_of_response_aux list = List.map get_balance param_bo_aux.requests in
    let convert = fun ( r : balance_of_response_aux) -> Layout.convert_to_right_comb(r) in
    let balance_of_callback_param_michelson : balance_of_response_michelson list = List.map convert balance_of_callback_param in
    // sending back the processed map of balance requests/responses
    let destination: (balance_of_response_michelson list) contract = param_bo_aux.callback in
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
        let apply_transfer = fun (eo_oe,i : (entityIndexToOwner * owner_entities) * transfer_michelson) -> 
            let t_aux : transfer_aux = Layout.convert_from_right_comb(i: transfer_michelson) in
            let from_ : address = t_aux.from_ in
            let result_ledger : (entityIndexToOwner * owner_entities) = 
                if Tezos.sender = from_ or Tezos.sender = s.administrator or Set.mem {owner=from_;operator=Tezos.sender} s.operators then
                    let transfers : transfer_destination_michelson list = t_aux.txs in
                    let apply_transfer_destination = fun (acc,j : ((entityIndexToOwner * owner_entities) * transfer_destination_michelson)) ->
                        let transfer_destination : transfer_destination = Layout.convert_from_right_comb(j: transfer_destination_michelson) in  
                        let to_ : address = transfer_destination.to_ in
                        let tokenid : token_id = transfer_destination.token_id in
                        
                        // hack
                        let transfered_entity : nat = transfer_destination.amount in
                    
                        let current_entity_owner : entityIndexToOwner = acc.0 in
                        let current_owner_entities : owner_entities = acc.1 in
                        
                        //asset(entity_owner[entity_id] = from)
                        let assert_owner_from : bool = match Map.find_opt (transfered_entity,tokenid) current_entity_owner with 
                        | None -> (failwith("entity does not exist") : bool)
                        | Some ownr -> ownr = from_ 
                        in
                        if assert_owner_from then 
                            //entity_owner[entity_id] = to
                            let update_entity_owner : entityIndexToOwner = Map.update (transfered_entity,tokenid) (Some to_) current_entity_owner in

                            let owner_entities_from : entity_key set = match Map.find_opt from_ current_owner_entities with 
                            | None -> (failwith(not_owner) : entity_key set)
                            | Some et_s -> Set.remove (transfered_entity,tokenid) et_s 
                            in 
                            let updated_owner_entities : owner_entities = Map.update from_ (Some owner_entities_from) current_owner_entities in 
                            let owner_entities_to : entity_key set = match Map.find_opt to_ updated_owner_entities with 
                            | None -> (failwith(not_owner) : entity_key set)
                            | Some et_s -> Set.add (transfered_entity,tokenid) et_s 
                            in 
                            let updated_owner_entities2 : owner_entities = Map.update to_ (Some owner_entities_to) updated_owner_entities in 
                            (update_entity_owner, updated_owner_entities2)
                        else 
                            (failwith(not_owner) : (entityIndexToOwner * owner_entities))
                    in
                    let result : (entityIndexToOwner * owner_entities) = List.fold apply_transfer_destination transfers eo_oe in
                    result
                else
                    (failwith(not_owner ^ not_operator) : (entityIndexToOwner * owner_entities))
            in
            result_ledger
        in
        let new_ledger : (entityIndexToOwner * owner_entities) = List.fold apply_transfer params (s.entity_owner, s.owner_entities) in
        (([] : operation list), {s with entity_owner=new_ledger.0;owner_entities=new_ledger.1})

let update_operators (params,s : (update_operator_michelson list * storage)) : return =
    if Tezos.sender <> s.administrator then
        (failwith("operators can only be modified by the admin") : return)
    else
        let convert = fun (i : update_operator_michelson) -> (Layout.convert_from_right_comb(i) : update_operator_aux) in
        let params_aux_list : update_operator_aux list = List.map convert params in
        let apply_order = fun (acc,j : operator_param set * update_operator_aux) ->   
            match j with
            | Add_operator opm ->
                let p : operator_param = Layout.convert_from_right_comb(opm) in 
                if (Tezos.sender = p.owner or Tezos.sender = s.administrator) then
                    Set.add p acc
                else
                    (failwith("notautorized !!!! ") : operator_param set)
            | Remove_operator opm -> 
                let p : operator_param = Layout.convert_from_right_comb(opm) in
                if (Tezos.sender = p.owner or Tezos.sender = s.administrator) then
                    Set.remove p acc
                else
                    (failwith("notautorized !!!! ") : operator_param set)
        in
        let new_operators : operator_param set = List.fold apply_order params_aux_list s.operators in
        (([] : operation list), {s with operators=new_operators})

let is_operator(params,s : (is_operator_param_michelson * storage)) : return =
    let p : is_operator_param_aux = Layout.convert_from_right_comb(params) in
    let op_param : operator_param = Layout.convert_from_right_comb(p.operator) in
    let response_aux : is_operator_response_aux = {operator=p.operator;is_operator=Set.mem op_param s.operators} in
    let response : is_operator_response_michelson = Layout.convert_to_right_comb(response_aux) in
    let destination: (is_operator_response_michelson) contract = p.callback in
    let op : operation = Tezos.transaction response 0mutez destination in
    ([ op ], s)

let send_permissions_descriptor(param,s : (permissions_descriptor_michelson contract * storage)) : return =
    let response : permissions_descriptor_michelson = Layout.convert_to_right_comb(s.permissions_descriptor) in
    let destination: permissions_descriptor_michelson contract = param in
    let op : operation = Tezos.transaction response 0mutez destination in
    ([ op ], s)

let main (param,s : total_entry_points * storage) : return =
  match param with 
  | M_left fa2_ep -> (match fa2_ep with 
    | Transfer l -> transfer (l, s)
    | Balance_of p -> balance_of (p, s)
    | Total_supply p -> total_supply (p,s)
    | Token_metadata p -> token_metadata (p,s)
    | Permissions_descriptor callback -> send_permissions_descriptor (callback, s)
    | Update_operators l -> update_operators (l,s)
    | Is_operator o -> is_operator (o,s)
    )
  | M_right specific_ep -> (match specific_ep with
    | Set_pause p -> set_pause (p,s)
    | Set_administrator p -> set_administrator (p,s)
    | Mint ent -> mint (ent,s)
    )
