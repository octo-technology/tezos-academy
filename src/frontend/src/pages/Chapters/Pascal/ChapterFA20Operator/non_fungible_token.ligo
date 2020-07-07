#include "tzip-12/fa2_interface.ligo"
#include "tzip-12/lib/fa2_operator_lib.ligo"

type ledger is big_map(token_id, address);

type storage is record
  ledger             : ledger
; operators          : operators
end

type entrypoint is list (operation) * storage

// Custom
type mint_param_ is record
  to_    : address
; amount : nat
end
type mint_param is michelson_pair_right_comb (mint_param_)
type mint_params is list (mint_param)
type burn_params is list (nat)

function fail_on( const condition : bool; const message : string) : unit is if condition then failwith (message) else unit

(*
 * FA2-specific entrypoints
 *)
function transfer( const params : transfer_params; const store  : storage) : entrypoint is 
  block { 
    const sender_addr : address = Tezos.sender;

    function make_transfer( const acc : entrypoint; const parameter : transfer_param) : entrypoint is 
      block { 
        validate_operators (parameter, acc.1.operators);

        function transfer_tokens( const accumulator : storage; const destination : transfer_destination) : storage is 
          block { 
            validate_token_type (destination.1.0);
            const tok_id : nat = destination.1.1;
            const updated_ledger : ledger = Big_map.update(tok_id, Some (destination.0), store.ledger);
          } with accumulator with record [ ledger = updated_ledger ];

        const operator : address = parameter.0;
        const txs : list (transfer_destination) = parameter.1;

        const upd : list (operation) = (nil : list (operation)); 
        const ups : storage = List.fold (transfer_tokens, txs, acc.1)
      } with (merge_operations (upd, acc.0), ups)

} with List.fold (make_transfer, params, ((nil : list (operation)), store))


function balance_of ( const parameter : balance_of_params; const store : storage) : entrypoint is 
block { 
  function retreive_balance( const request : balance_of_request) : balance_of_response is 
  block { 
    validate_token_type (request.token_id);
    var retreived_balance : nat := case Big_map.find_opt (request.token_id, store.ledger) of
      Some (current_owner) -> if (request.owner =/= current_owner) then 0n else 1n
    | None -> 0n
    end
  } with (request, retreived_balance);

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

function is_operator_action( const parameter : is_operator_params; const store : storage) : entrypoint is
  ( list [is_operator (parameter, store.operators)]
  , store
  )


type custom_entry_points is 
| Mint of mint_params
| Burn of burn_params

(* NFT parameter *)
type closed_parameter is
| Fa2              of fa2_entry_points
| Asset            of custom_entry_points

function custom_main( const action : custom_entry_points; const store  : storage) : entrypoint is 
    case action of
      Mint                  (params) -> ((nil: list(operation)), store)
    | Burn                  (params) -> ((nil: list(operation)), store)
    end

function fa2_main( const action : fa2_entry_points; const store  : storage) : entrypoint is 
    case action of
      Transfer                (params) -> transfer                (params, store)
    | Balance_of              (params) -> balance_of              (params, store)
    | Token_metadata_registry (params) -> token_metadata_registry (params, store)
    | Permissions_descriptor  (params) -> permission_descriptor   (params, store)
    | Update_operators        (params) -> update_operators_action (params, store)
    | Is_operator             (params) -> is_operator_action      (params, store)
    end

function main( const action : closed_parameter; const store  : storage) : entrypoint is 
block { fail_on (Tezos.amount =/= 0tz, "XTZ_RECEIVED") // Validate whether the contract receives non-zero amount of tokens
} with case action of
    Fa2                   (params) -> fa2_main              (params, store)
  | Asset                 (params) -> custom_main           (params, store)
  end