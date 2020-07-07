#include "tzip-12/fa2_interface.ligo"


(*
 * Storage
 *)

type ledger is big_map (address, nat)

type storage is record
  ledger             : ledger
; token_metadata     : big_map (token_id, token_metadata)
; total_supply       : nat
; operators          : operators
; safelist_contract  : option(address)
end

type entrypoint is list (operation) * storage



(*
 * Custom
 *)


type mint_param_ is record
  to_    : address
; amount : nat
end

type mint_param is michelson_pair_right_comb (mint_param_)

type mint_params is list (mint_param)

type burn_params is list (nat)

type safelist_transfer_item is michelson_pair(address, "from", list(address), "tos")

type safelist_assert_transfers_param is list(safelist_transfer_item)

type safelist_assert_receiver_param is address

type safelist_assert_receivers_param is list(address)

type set_safelist_param is option(address)

#include "fungible_token_impl.ligo"

type custom_entry_points is 
| Mint of mint_params
| Burn of burn_params

(* Stablecoin parameter *)
type closed_parameter is
| FA2              of fa2_entry_points
| Asset            of custom_entry_points

function custom_main( const action : custom_entry_points; const store  : storage) : entrypoint is 
    case action of
      Mint                  (params) -> mint                  (params, store)
    | Burn                  (params) -> burn                  (params, store)
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
    FA2                   (params) -> fa2_main              (params, store)
  | Asset                 (params) -> custom_main           (params, store)
  end