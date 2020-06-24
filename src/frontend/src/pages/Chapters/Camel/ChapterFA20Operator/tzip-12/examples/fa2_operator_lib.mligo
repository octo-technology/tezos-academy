(** Reference implementation of the FA2 operator storage and config API functions *)

#include "../fa2_interface.mligo"

type operator_tokens_entry =
  | All_operator_tokens
  | Some_operator_tokens of token_id set
  | All_operator_tokens_except of token_id set

(*  (owner * operator) -> tokens *)
type operator_storage = ((address * address), operator_tokens_entry) big_map

let add_tokens (existing_ts, ts_to_add : (operator_tokens_entry option) * (token_id set))
    : operator_tokens_entry =
  match existing_ts with
  | None -> Some_operator_tokens ts_to_add
  | Some ets -> (
    match ets with
    | All_operator_tokens -> All_operator_tokens
    | Some_operator_tokens ets -> 
      (* merge sets *)
      let new_ts = Set.fold 
        (fun (acc, tid : (token_id set) * token_id) -> Set.add tid acc)
        ts_to_add ets in
      Some_operator_tokens new_ts
    | All_operator_tokens_except ets ->
      (* subtract sets *)
      let new_ts = Set.fold 
        (fun (acc, tid : (token_id set) * token_id) -> Set.remove tid acc)
        ts_to_add ets in
      if (Set.size new_ts) = 0n 
      then All_operator_tokens 
      else All_operator_tokens_except new_ts
  )

let add_operator (op, storage : operator_param * operator_storage) : operator_storage =
  let key = op.owner, op.operator in
  let new_tokens = match op.tokens with
  | All_tokens -> All_operator_tokens
  | Some_tokens ts_to_add ->
      let existing_tokens = Big_map.find_opt key storage in
      add_tokens (existing_tokens, ts_to_add)
  in
  Big_map.update key (Some new_tokens) storage

let remove_tokens (existing_ts, ts_to_remove : (operator_tokens_entry option) * (token_id set))
    : operator_tokens_entry option =
  match existing_ts with
  | None -> (None : operator_tokens_entry option)
  | Some ets -> (
    match ets with
    | All_operator_tokens -> Some (All_operator_tokens_except ts_to_remove)
    | Some_operator_tokens ets ->
      (* subtract sets *)
      let new_ts = Set.fold 
        (fun (acc, tid : (token_id set) * token_id) -> Set.remove tid acc)
        ts_to_remove ets in
      if (Set.size new_ts) = 0n
      then (None : operator_tokens_entry option)
      else Some (Some_operator_tokens new_ts)
    | All_operator_tokens_except ets ->
       (* merge sets *)
      let new_ts = Set.fold 
        (fun (acc, tid : (token_id set) * token_id) -> Set.add tid acc)
        ts_to_remove ets in
      Some (All_operator_tokens_except new_ts)
  )

let remove_operator (op, storage : operator_param * operator_storage) : operator_storage =
  let key = op.owner, op.operator in
  let new_tokens_opt = match op.tokens with
  | All_tokens -> (None : operator_tokens_entry option)
  | Some_tokens ts_to_remove ->
      let existing_tokens = Big_map.find_opt key storage in
      remove_tokens (existing_tokens, ts_to_remove)
  in
  Big_map.update key new_tokens_opt storage

let are_tokens_included (existing_tokens, ts : operator_tokens_entry * operator_tokens) : bool =
  match existing_tokens with
  | All_operator_tokens -> true
  | Some_operator_tokens ets -> (
    match ts with
    | All_tokens -> false
    | Some_tokens ots ->
      (* all ots tokens must be in ets set*)
      Set.fold (fun (res, ti : bool * token_id) ->
        if (Set.mem ti ets) then res else false
      ) ots true
  )
  | All_operator_tokens_except ets -> (
    match ts with 
    | All_tokens -> false
    | Some_tokens ots ->
      (* None of the its tokens must be in ets *)
      Set.fold (fun (res, ti : bool * token_id) ->
          if (Set.mem ti ets) then false else res
      ) ots true
  )

let is_operator_impl (p, storage : operator_param * operator_storage) : bool = 
  let key = p.owner, p.operator in
  let op_tokens = Big_map.find_opt key storage in
  match op_tokens with
  | None -> false
  | Some existing_tokens -> are_tokens_included (existing_tokens, p.tokens)
    
let update_operators (params, storage : (update_operator list) * operator_storage)
    : operator_storage =
  List.fold
    (fun (s, up : operator_storage * update_operator) ->
      match up with
      | Add_operator op -> add_operator (op, s)
      | Remove_operator op -> remove_operator (op, s)
    ) params storage

let is_operator (param, storage :  is_operator_param * operator_storage) : operation =
  let is_op = is_operator_impl (param.operator, storage) in 
  let r : is_operator_response = { 
    operator = param.operator;
    is_operator = is_op; 
  } in
  Operation.transaction r 0mutez param.callback

type owner_to_tokens = (address, (token_id set)) map

let validate_operator (self, txs, ops_storage 
    : self_transfer_policy * (transfer list) * operator_storage) : unit =
  let can_self_tx = match self with
  | Self_transfer_permitted -> true
  | Self_transfer_denied -> false
  in
  let operator = Current.sender in
  let tokens_by_owner = List.fold
    (fun (owners, tx : owner_to_tokens * transfer) ->
      let tokens = Map.find_opt tx.from_ owners in
      let new_tokens = match tokens with
      | None -> Set.literal [tx.token_id]
      | Some ts -> Set.add tx.token_id ts
      in
      Map.update tx.from_ (Some new_tokens) owners
    ) txs (Map.empty : owner_to_tokens) in

  Map.iter
    (fun (owner, tokens : address * (token_id set)) ->
      if can_self_tx && owner = operator
      then unit
      else
        let oparam : operator_param = {
          owner = owner;
          operator = sender;
          tokens = Some_tokens tokens;
        } in
        let is_op = is_operator_impl (oparam, ops_storage) in
        if is_op then unit else failwith "not permitted operator"
    ) tokens_by_owner


let test(u : unit) = unit 