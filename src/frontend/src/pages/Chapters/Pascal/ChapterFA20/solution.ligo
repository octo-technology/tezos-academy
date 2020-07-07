// SPDX-FileCopyrightText: 2020 tqtezos
// SPDX-License-Identifier: MIT

#include "tzip-12/lib/fa2_operator_lib.ligo"

(*
 * Helpers
 *)
function fail_on( const condition : bool; const message : string) : unit is if condition then failwith (message) else unit

function credit_to( const parameter : mint_param_; const store : storage) : storage is 
block { 
  var updated_balance : nat := 0n;

  case store.ledger[parameter.to_] of
    Some (ledger_balance) -> updated_balance := ledger_balance
  | None -> skip
  end;

  updated_balance := updated_balance + parameter.amount;
  const updated_ledger : ledger = Big_map.update(parameter.to_, Some (updated_balance), store.ledger);
} with store with record [ ledger = updated_ledger ]

type debit_param_ is record
  from_  : address
; amount : nat
end

function debit_from( const parameter : debit_param_; const store : storage) : storage is block
{ 
  var updated_ledger : ledger := store.ledger;
  const curr_balance : nat = case store.ledger[parameter.from_] of
    Some (ledger_balance) -> ledger_balance
  | None -> 0n 
  end;
  if parameter.amount > curr_balance then 
    failwith ("FA2_INSUFFICIENT_BALANCE")
  else { 
    const updated_balance : nat = abs (curr_balance - parameter.amount);
    updated_ledger := Big_map.update(parameter.from_, Some (updated_balance), updated_ledger)
  }
} with store with record [ ledger = updated_ledger ]


function convert_to_safelist_transfer( const tp : transfer_param) : safelist_transfer_item is
  ( 
    tp.0, 
    List.map( 
      function( const dst: transfer_destination) : address is dst.0,
       tp.1
    )
  )

function call_assert_transfers( const ops_in : list(operation); const opt_sl_address : option(address); const transfer_params : transfer_params) : list(operation) is 
block { 
  const operations: list(operation) = case opt_sl_address of
    Some (sl_address) -> case (Tezos.get_entrypoint_opt ("%assertTransfers", sl_address) : option(contract(safelist_assert_transfers_param))) of
        Some (sl_caddress) -> Tezos.transaction( List.map(convert_to_safelist_transfer, transfer_params), 0mutez, sl_caddress) # ops_in
        | None -> (failwith ("BAD_SAFELIST_CONTRACT") : list(operation))
        end
    | None -> ops_in
  end
} with operations

function call_assert_receivers( const opt_sl_address : option(address); const receivers : list(address)) : list(operation) is 
  block {
    const ops_in : list(operation) = nil;
    const operations:list(operation) = case opt_sl_address of
        Some (sl_address) -> case (Tezos.get_entrypoint_opt ("%assertReceivers", sl_address) : option(contract(safelist_assert_receivers_param))) of
            Some (sl_caddress) -> Tezos.transaction( receivers, 0mutez, sl_caddress) # ops_in
            | None -> (failwith ("BAD_SAFELIST_CONTRACT") : list(operation))
            end
      | None -> ops_in
      end
  } with operations

function call_assert_receiver( const opt_sl_address : option(address); const receiver : address) : list(operation) is 
  block { 
    const ops_in : list(operation) = nil;
    const operations:list(operation) = case opt_sl_address of
        Some (sl_address) -> case (Tezos.get_entrypoint_opt ("%assertReceiver", sl_address) : option(contract(safelist_assert_receiver_param))) of
            Some (sl_caddress) -> Tezos.transaction( receiver, 0mutez, sl_caddress) # ops_in
            | None -> (failwith ("BAD_SAFELIST_CONTRACT") : list(operation))
            end
      | None -> ops_in
      end
  } with operations

(*
 * FA2-specific entrypoints
 *)
function transfer( const params : transfer_params; const store  : storage) : entrypoint is 
  block { 
    const sender_addr : address = Tezos.sender;

    function make_transfer
      ( const acc       : entrypoint
      ; const parameter : transfer_param
      ) : entrypoint is block
    { 
      validate_operators (parameter, acc.1.operators);

      function transfer_tokens
          ( const accumulator : storage
          ; const destination : transfer_destination
          ) : storage is block
        { 
          validate_token_type (destination.1.0);
          const debit_param_ : debit_param_ = record [ from_  = parameter.0; amount = destination.1.1 ];
          const credit_param_ : mint_param_ = record[ to_ = destination.0; amount = destination.1.1 ];
          const debited_storage : storage = debit_from (debit_param_, accumulator);
          const credited_storage : storage = credit_to (credit_param_, debited_storage);
        } with credited_storage;

      const operator : address = parameter.0;
      const txs : list (transfer_destination) = parameter.1;

      const upd : list (operation) = call_assert_transfers( generic_transfer_hook (parameter), store.safelist_contract, params);
      const ups : storage = List.fold (transfer_tokens, txs, acc.1)
    } with (merge_operations (upd, acc.0), ups)

} with List.fold (make_transfer, params, ((nil : list (operation)), store))

function balance_of ( const parameter : balance_of_params; const store : storage) : entrypoint is 
block { 
  function retreive_balance( const request : balance_of_request) : balance_of_response is 
  block { 
    validate_token_type (request.token_id);
    // Type your solution below
    var retreived_balance : nat := 0n;
    case Big_map.find_opt (request.owner, store.ledger) of
      Some (ledger_balance) -> retreived_balance := ledger_balance
    | None -> skip
    end;
    const response : balance_of_response_ = record[request=request; balance=retreived_balance]
  } with Layout.convert_to_right_comb((response: balance_of_response_));

  const responses : list (balance_of_response) = List.map (retreive_balance, parameter.0);
  const transfer_operation : operation = Tezos.transaction (responses, 0mutez, parameter.1);
} with (list [transfer_operation], store)

function token_metadata_registry( const parameter : token_metadata_registry_params; const store : storage) : entrypoint is
  ( list [Tezos.transaction( Tezos.self_address, 0mutez, parameter)], store )

function permission_descriptor( const parameter : permissions_descriptor_params; const store : storage) : entrypoint is 
  block  { 
    const operator_permissions : operator_transfer_policy = Layout.convert_to_right_comb((Owner_or_operator_transfer : operator_transfer_policy_));
    const owner_hook_policy : owner_hook_policy = Layout.convert_to_right_comb((Optional_owner_hook : owner_hook_policy_));
    const permissions : permissions_descriptor = (operator_permissions, (owner_hook_policy, (owner_hook_policy, (None : option (custom_permission_policy)))));
  } with ( list [Tezos.transaction( permissions, 0mutez, parameter)], store )

function update_operators_action( const parameter : update_operator_params; const store : storage) : entrypoint is 
  block { 
    const updated_operators : operators = update_operators (parameter, store.operators)
  } with ( (nil : list (operation)), store with record [ operators = updated_operators ] )

function is_operator( const param  : is_operator_params; const operators : operators) : operation is 
block { 
  const operator_param : operator_param_ = Layout.convert_from_right_comb ((param.0 : operator_param));
  const operator_key : (owner * operator) = (operator_param.owner, operator_param.operator);
  const is_present : bool = Big_map.mem (operator_key, operators);
  const response : is_operator_response = (param.0, is_present);
} with Tezos.transaction (response, 0mutez, param.1)

function is_operator_action
  ( const parameter : is_operator_params
  ; const store     : storage
  ) : entrypoint is
  ( list [is_operator (parameter, store.operators)]
  , store
  )

function mint( const parameters : mint_params; const store : storage) : entrypoint is 
block { 
  function mint_tokens( const accumulator : storage; const mint_param : mint_param) : storage is 
    block {
      const unwrapped_parameter : mint_param_ = Layout.convert_from_right_comb ((mint_param : mint_param))
    } with credit_to (unwrapped_parameter, accumulator);

  const receivers : list(address) = List.map( function(const mint_param: mint_param) : address is mint_param.0 , parameters);
  const upds : list(operation) = call_assert_receivers ( store.safelist_contract, Tezos.sender # receivers)
} with ( upds, List.fold( 
  function( const accumulator : storage; const mint_param  : mint_param) : storage is mint_tokens (accumulator, mint_param)
  , parameters
  , store
  )
)

function burn( const parameters : burn_params; const store      : storage) : entrypoint is 
block { 
  const sender_address : address = Tezos.sender;
  function burn_tokens( const accumulator : storage; const burn_amount : nat) : storage is 
    block { 
      const debited_storage : storage = debit_from( record[ from_ = sender_address; amount = burn_amount], accumulator);
    } with debited_storage;

  const upds : list(operation) = call_assert_receiver( store.safelist_contract, Tezos.sender)

} with ( upds, List.fold (burn_tokens, parameters, store) )



