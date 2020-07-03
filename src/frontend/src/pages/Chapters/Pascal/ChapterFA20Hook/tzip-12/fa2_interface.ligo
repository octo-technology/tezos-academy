// SPDX-FileCopyrightText: 2020 tqtezos
// SPDX-License-Identifier: MIT

#if ! FA2_INTERFACE
#define FA2_INTERFACE

type token_id is nat

const default_token_id : token_id = 0n;

(*
 * This function fails if provided token_id is not equal to
 * default one, restricting all operations to be one-token
 * (that are allowed for `default_token_id`)
 *)
function validate_token_type
  ( const token_id : token_id
  ) : unit is
    if token_id =/= default_token_id
    then failwith ("FA2_TOKEN_UNDEFINED")
    else unit

(*
 * Same as above but for a list of token ids
 *)
function validate_token_types
  ( const token_ids : list (token_id)
  ) : unit is List.fold
    ( function
        ( const u        : unit
        ; const token_id : token_id
        ) : unit is validate_token_type (token_id)
    , token_ids
    , unit
    )


type transfer_destination_ is record
  to_      : address
; token_id : token_id
; amount   : nat
end

type transfer_destination is michelson_pair_right_comb(transfer_destination_)

type transfer_param_ is record
  from_ : address
; txs : list (transfer_destination)
end

type transfer_param is michelson_pair_right_comb(transfer_param_)

type transfer_params is list (transfer_param)

type balance_of_request is record
   owner    :  address
;  token_id : token_id
end

type balance_of_response_ is record
  request : balance_of_request
; balance : nat
end

type balance_of_response is michelson_pair_right_comb(balance_of_response_)

type balance_of_params_ is record
  requests : list (balance_of_request)
; callback : contract (list (balance_of_response))
end

type balance_of_params is michelson_pair_right_comb(balance_of_params_)

type token_metadata_ is record
  token_id  : token_id
; symbol    : string
; name      : string
; decimals  : nat
; extras    : map (string, string)
end

type token_metadata is michelson_pair_right_comb(token_metadata_)

type token_metadata_registry_params is contract (address)

type owner is address
type operator is address

type operators is
  big_map ((owner * operator), unit)

type operator_param_ is record
  owner    : address
; operator : address
end

type operator_param is michelson_pair_right_comb(operator_param_)

type update_operator_param is
| Add_operator    of operator_param
| Remove_operator of operator_param

type update_operator_params is list (update_operator_param)

type is_operator_response_ is record
  operator    : operator_param
; is_operator : bool
end

type is_operator_response is michelson_pair_right_comb(is_operator_response_)

type is_operator_params_ is record
  operator : operator_param
; callback : contract (is_operator_response)
end

type is_operator_params is michelson_pair_right_comb(is_operator_params_)

(* ------------------------------------------------------------- *)

type operator_transfer_policy_ is
| No_transfer
| Owner_transfer
| Owner_or_operator_transfer

type operator_transfer_policy is michelson_or_right_comb(operator_transfer_policy_)

type owner_hook_policy_ is
| Owner_no_hook
| Optional_owner_hook
| Required_owner_hook

type owner_hook_policy is michelson_or_right_comb(owner_hook_policy_)

type custom_permission_policy_ is record
  tag        : string
; config_api : option (address)
end

type custom_permission_policy is michelson_pair_right_comb(custom_permission_policy_)

type permissions_descriptor_ is record
  operator : operator_transfer_policy
; receiver : owner_hook_policy
; sender   : owner_hook_policy
; custom   : option (custom_permission_policy)
end

type permissions_descriptor is michelson_pair_right_comb(permissions_descriptor_)

type permissions_descriptor_params is
  contract (permissions_descriptor)


type fa2_entry_points is
  Transfer                of transfer_params
| Balance_of              of balance_of_params
| Token_metadata_registry of token_metadata_registry_params
| Permissions_descriptor  of permissions_descriptor_params
| Update_operators        of update_operator_params
| Is_operator             of is_operator_params

(* ------------------------------------------------------------- *)

(*
 * Hooks
 *)

type transfer_destination_descriptor_ is record
  to_      : option (address)
; token_id : token_id
; amount   : nat
end

type transfer_destination_descriptor is michelson_pair_right_comb(transfer_destination_descriptor_)

type transfer_descriptor_ is record
  from_ : option (address)
; txs   : list (transfer_destination_descriptor)
end

type transfer_descriptor is michelson_pair_right_comb(transfer_descriptor_)

type transfer_descriptor_param_ is record
   fa2      : address
;  batch    : list(transfer_descriptor)
;  operator : address
end

type transfer_descriptor_param is michelson_pair_right_comb(transfer_descriptor_param_)

#endif