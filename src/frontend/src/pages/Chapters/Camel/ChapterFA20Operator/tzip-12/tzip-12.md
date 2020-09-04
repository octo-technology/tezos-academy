---
tzip: 12
title: FA2 - Multi-Asset Interface
status: Draft
type: Financial Asset (FA)
author: Eugene Mishura (@e-mishura)
created: 2020-01-24
---

## Table Of Contents

- [Summary](#summary)
- [Motivation](#motivation)
- [Abstract](#abstract)
- [Interface Specification](#interface-specification)
  - [Entry Point Semantics](#entry-point-semantics)
    - [`transfer`](#transfer)
      - [Core `transfer` Behavior](#core-transfer-behavior)
      - [Default `transfer` Permission Policy](#default-transfer-permission-policy)
    - [`balance_of`](#balance_of)
    - [Operators](#operators)
      - [`update_operators`](#update_operators)
    - [Token Metadata](#token-metadata)
      - [`token_metadata_registry`](#token_metadata_registry)
      - [`token_metadata` `big_map`](#token_metadata-big_map)
      - [`token_metadata` Entry Point](#token_metadata-entry-point)
  - [FA2 Permission Policies and Configuration](#fa2-permission-policies-and-configuration)
    - [A Taxonomy of Permission Policies](#a-taxonomy-of-permission-policies)
      - [`permissions_descriptor`](#permissions_descriptor)
  - [Error Handling](#error-handling)
- [Implementing Different Token Types with FA2](#implementing-different-token-types-with-fa2)
  - [Single Fungible Token](#single-fungible-token)
  - [Multiple Fungible Tokens](#multiple-fungible-tokens)
  - [Non-fungible Tokens](#non-fungible-tokens)
  - [Mixing Fungible and Non-fungible Tokens](#mixing-fungible-and-non-fungible-tokens)
  - [Non-transferable Tokens](#non-transferable-tokens)
- [Future Directions](#future-directions)
- [Copyright](#copyright)

## Summary

TZIP-12 proposes a standard for a unified token contract interface,
supporting a wide range of token types and implementations. This document provides
an overview and rationale for the interface, token transfer semantics, and support
for various transfer permission policies.

**PLEASE NOTE:** This API specification remains a work-in-progress and may evolve
based on public comment see FA2 Request for Comment on [Tezos Agora](https://tezosagora.org).

## Motivation

There are multiple dimensions and considerations while implementing a particular
token smart contract. Tokens might be fungible or non-fungible. A variety of
permission policies can be used to define how many tokens can be transferred, who
can perform a transfer, and who can receive tokens. A token contract can be
designed to support a single token type (e.g. ERC-20 or ERC-721) or multiple token
types (e.g. ERC-1155) to optimize batch transfers and atomic swaps of the tokens.

Such considerations can easily lead to the proliferation of many token standards,
each optimized for a particular token type or use case. This situation is apparent
in the Ethereum ecosystem, where many standards have been proposed, but ERC-20
(fungible tokens) and ERC-721 (non-fungible tokens) are dominant.

Token wallets, token exchanges, and other clients then need to support multiple
standards and multiple token APIs. The FA2 standard proposes a unified token
contract interface that accommodates all mentioned concerns. It aims to provide
significant expressivity to contract developers to create new types of tokens
while maintaining a common interface standard for wallet integrators and external
developers.

## Abstract

Token type is uniquely identified on the chain by a pair composed of the token
contract address and token ID, a natural number (`nat`). If the underlying contract
implementation supports only a single token type (e.g. ERC-20-like contract),
the token ID MUST be `0n`. In the case, when multiple token types are supported
within the same FA2 token contract (e. g. ERC-1155-like contract), the contract
is fully responsible for assigning and managing token IDs. FA2 clients MUST NOT
depend on particular ID values to infer information about a token.

Most of the entry points are batch operations that allow querying or transfer of
multiple token types atomically. If the underlying contract implementation supports
only a single token type, the batch may contain single or multiple entries where
token ID will be a fixed `0n` value. Likewise, if multiple token types are supported,
the batch may contain zero or more entries and there may be duplicate token IDs.

Most token standards specify logic that validates a transfer transaction and can
either approve or reject a transfer. Such logic could validate who can perform a
transfer, the transfer amount, and who can receive tokens. This standard calls such
logic a _permission policy_. The FA2 standard defines the
[default `transfer` permission policy](#default-transfer-permission-policy) that
specify who can transfer tokens. The default policy allows transfers by
either token owner (an account that holds token balance) or by an operator
(an account that is permitted to manage tokens on behalf of the token owner).

Unlike many other standards, FA2 allows to customize the default permission policy
(see [FA2 Permission Policies and Configuration](#fa2-permission-policies-and-configuration))
using a set of predefined permission policies that are optional.

This specification defines the set of [standard errors](#error-handling) and error
mnemonics to be used when implementing FA2. However, some implementations MAY
introduce their custom errors that MUST follow the same pattern as standard ones.

## Interface Specification

Token contract implementing the FA2 standard MUST have the following entry points.
Notation is given in [cameLIGO language](https://ligolang.org) for readability
and Michelson. The LIGO definition, when compiled, generates compatible Michelson
entry points.

`type fa2_entry_points =`

- [`| Transfer of transfer list`](#transfer)
- [`| Balance_of of balance_of_param`](#balance_of)
- [`| Update_operators of update_operator list`](#update_operators)
- [`| Token_metadata_registry of address contract`](##token_metadata_registry)

The full definition of the FA2 entry points in LIGO and related types can be found
in [fa2_interface.mligo](./fa2_interface.mligo).

### Entry Point Semantics

#### `transfer`

LIGO definition:

```ocaml
type token_id = nat

type transfer_destination = {
  to_ : address;
  token_id : token_id;
  amount : nat;
}

type transfer = {
  from_ : address;
  txs : transfer_destination list;
}

| Transfer of transfer_michelson list
```

<details>
<summary>where</summary>

```ocaml
type transfer_destination_michelson = transfer_destination michelson_pair_right_comb

type transfer_aux = {
  from_ : address;
  txs : transfer_destination_michelson list;
}

type transfer_michelson = transfer_aux michelson_pair_right_comb
```

</details>

Michelson definition:

```
(list %transfer
  (pair
    (address %from_)
    (list %txs
      (pair
        (address %to_)
        (pair
          (nat %token_id)
          (nat %amount)
        )
      )
    )
  )
)
```

Each transfer in the batch is specified between one source (`from_`) address and
a list of destinations. Each `transfer_destination` specifies token type and the
amount to be transferred from the source address to the destination (`to_`) address.

FA2 does NOT specify an interface for mint and burn operations; however, if an
FA2 token contract implements mint and burn operations, it SHOULD, when possible,
enforce the same rules and logic applied to the token transfer operation. Mint
and burn can be considered special cases of the transfer. Although, it is possible
that mint and burn have more or less restrictive rules than the regular transfer.
For instance, mint and burn operations may be invoked by a special privileged
administrative address only. In this case, regular operator restrictions may not
be applicable.

##### Core `transfer` Behavior

FA2 token contracts MUST always implement this behavior.

- Every transfer operation MUST happen atomically and in order. If at least one
  transfer in the batch cannot be completed, the whole transaction MUST fail, all
  token transfers MUST be reverted, and token balances MUST remain unchanged.

- Each individual transfer MUST decrement token balance of the source (`from_`)
  address by the amount of the transfer and increment token balance of the destination
  (`to_`) address by the amount of the transfer.

- If the transfer amount exceeds current token balance of the source address,
  the whole transfer operation MUST fail with the error mnemonic `"FA2_INSUFFICIENT_BALANCE"`.

- If the token owner does not hold any tokens of type `token_id`, the owner's balance
  is interpreted as zero. No token owner can have a negative balance.

- The transfer MUST update token balances exactly as the operation
  parameters specify it. Transfer operations MUST NOT try to adjust transfer
  amounts or try to add/remove additional transfers like transaction fees.

- Transfers of zero amount MUST be treated as normal transfers.

- If one of the specified `token_id`s is not defined within the FA2 contract, the
  entry point MUST fail with the error mnemonic `"FA2_TOKEN_UNDEFINED"`.

- Transfer implementations MUST apply permission policy logic (either
  [default transfer permission policy](#default-transfer-permission-policy) or
  [customized one](#customizing-permission-policy)).
  If permission logic rejects a transfer, the whole operation MUST fail.

- Core transfer behavior MAY be extended. If additional constraints on tokens
  transfer are required, FA2 token contract implementation MAY invoke additional
  permission policies. If the additional permission fails, the whole transfer
  operation MUST fail with a custom error mnemonic.

##### Default `transfer` Permission Policy

- Token owner address MUST be able to perform a transfer of its own tokens (e. g.
  `SENDER` equals to `from_` parameter in the `transfer`).

- An operator (a Tezos address that performs token transfer operation on behalf
  of the owner) MUST be permitted to manage all owner's tokens before it invokes
  a transfer transaction (see [`update_operators`](#update_operators)).

- If the address that invokes a transfer operation is neither a token owner nor
  one of the permitted operators, the transaction MUST fail with the error mnemonic
  `"FA2_NOT_OPERATOR"`. If at least one of the `transfer`s in the batch is not permitted,
  the whole transaction MUST fail.

#### `balance_of`

LIGO definition:

```ocaml
type token_id = nat

type balance_of_request = {
  owner : address;
  token_id : token_id;
}

type balance_of_response = {
  request : balance_of_request;
  balance : nat;
}

type balance_of_param = {
  requests : balance_of_request list;
  callback : (balance_of_response_michelson list) contract;
}

| Balance_of of balance_of_param_michelson
```

<details>
<summary>where</summary>

```ocaml
type balance_of_request_michelson = balance_of_request michelson_pair_right_comb

type balance_of_response_aux = {
  request : balance_of_request_michelson;
  balance : nat;
}

type balance_of_response_michelson = balance_of_response_aux michelson_pair_right_comb

type balance_of_param_aux = {
  requests : balance_of_request_michelson list;
  callback : (balance_of_response_michelson list) contract;
}

type balance_of_param_michelson = balance_of_param_aux michelson_pair_right_comb
```

</details>

Michelson definition:

```
(pair %balance_of
  (list %requests
    (pair
      (address %owner)
      (nat %token_id)
    )
  )
  (contract %callback
    (list
      (pair
        (pair %request
          (address %owner)
          (nat %token_id)
        )
        (nat %balance)
      )
    )
  )
)
```

Get the balance of multiple account/token pairs. Accepts a list of
`balance_of_request`s and a callback contract `callback` which accepts a list of
`balance_of_response` records.

- There may be duplicate `balance_of_request`'s, in which case they should not be
  deduplicated nor reordered.

- If the account does not hold any tokens, the account
  balance is interpreted as zero.

- If one of the specified `token_id`s is not defined within the FA2 contract, the
  entry point MUST fail with the error mnemonic `"FA2_TOKEN_UNDEFINED"`.

_Notice:_ The `balance_of` entry point implements a _continuation-passing style (CPS)
view entry point_ pattern that invokes the other callback contract with the requested
data. This pattern, when not used carefully, could expose the callback contract
to an inconsistent state and/or manipulatable outcome (see
[view patterns](https://www.notion.so/Review-of-TZIP-12-95e4b631555d49429e2efdfe0f9ffdc0#6d68e18802734f059adf3f5ba8f32a74)).
The `balance_of` entry point should be used on the chain with the extreme caution.

#### Operators

**Operator** is a Tezos address that originates token transfer operation on behalf
of the owner.

**Owner** is a Tezos address which can hold tokens.

An operator, other than the owner, MUST be approved to manage all tokens held by
the owner to make a transfer from the owner account.

FA2 interface specifies two entry points to update and inspect operators. Once
permitted for the specific token owner, an operator can transfer any tokens belonging
to the owner.

##### `update_operators`

LIGO definition:

```ocaml
type operator_param = {
  owner : address;
  operator : address;
}

type update_operator =
  | Add_operator_p of operator_param
  | Remove_operator_p of operator_param

| Update_operators of update_operator_michelson list
```

<details>
<summary>where</summary>

```ocaml
type operator_param_michelson = operator_param michelson_pair_right_comb

type update_operator_aux =
  | Add_operator of operator_param_michelson
  | Remove_operator of operator_param_michelson

type update_operator_michelson = update_operator_aux michelson_or_right_comb
```

</details>

Michelson definition:

```
(list %update_operators
  (or
    (pair %add_operator
      (address %owner)
      (address %operator)
    )
    (pair %remove_operator
      (address %owner)
      (address %operator)
    )
  )
)
```

Add or Remove token operators for the specified owners.

- The entry point accepts a list of `update_operator` commands. If two different
  commands in the list add and remove an operator for the same owner,
  the last command in the list MUST take effect.

- It is possible to update operators for a token owner that does not hold any token
  balances yet.

- Operator relation is not transitive. If C is an operator of B , and if B is an
  operator of A, C cannot transfer tokens that are owned by A, on behalf of B.

The standard does not specify who is permitted to update operators on behalf of
the token owner. Depending on the business use case, the particular implementation
of the FA2 contract MAY limit operator updates to a token owner (`owner == SENDER`)
or be limited to an administrator.

#### Token Metadata

Each FA2 `token_id` has associated metadata of the following type:

```ocaml
type token_id = nat

type token_metadata = {
  token_id : token_id;
  symbol : string;
  name : string;
  decimals : nat;
  extras : (string, string) map;
}
```

Michelson definition:

```
(pair
  (nat %token_id)
  (pair
    (string %symbol)
    (pair
      (string %name)
      (pair
        (nat %decimals)
        (map %extras string string)
))))
```

- FA2 token amounts are represented by natural numbers (`nat`), and their
  **granularity** (the smallest amount of tokens which may be minted, burned, or
  transferred) is always 1.

- `decimals` is the number of digits to use after the decimal point when displaying
  the token amounts. If 0, the asset is not divisible. Decimals are used for display
  purposes only and MUST NOT affect transfer operation.

Examples

| Decimals | Amount | Display |
| -------- | ------ | ------- |
| 0n       | 123    | 123     |
| 1n       | 123    | 12.3    |
| 3n       | 123000 | 123     |

Token metadata is primarily useful in off-chain, user-facing contexts (e.g.
wallets, explorers, marketplaces). As a result, FA2 optimizes for off-chain use
of token metadata and minimal on-chain gas consumption. A related effort to create
a separate metadata TZIP standard is also underway.

- The FA2 contract MUST implement `token_metadata_registry` view entry point that
  returns an address of the contract holding tokens metadata. Token metadata can
  be held either by the FA2 token contract itself (then `token_metadata_registry`
  returns `SELF` address) or by a separate token registry contract.

- Token registry contract MUST implement one of two ways to expose token metadata
  for off-chain clients:

  - Contract storage MUST have a `big_map` that maps `token_id -> token_metadata`
    and annotated `%token_metadata`

  - Contract MUST implement entry point `token_metadata`

##### `token_metadata_registry`

LIGO definition:

```ocaml
| Token_metadata_registry of address contract
```

Michelson definition:

```
(contract %token_metadata_registry address)
```

Return address of the contract that holds tokens metadata. If the FA2 contract
holds its own tokens metadata, the entry point returns `SELF` address. The entry
point parameter is some contract entry point to be called with the address of the
token metadata registry.

##### `token_metadata` `big_map`

LIGO definition:

```ocaml
type <contract_storage> = {
  ...
  token_metadata : (token_id, token_metadata) big_map;
  ...
}
```

Michelson definition:

```
(big_map %token_metadata
  nat
  (pair
  (nat %token_id)
  (pair
    (string %symbol)
    (pair
      (string %name)
      (pair
        (nat %decimals)
        (map %extras string string)
  ))))
)
```

The FA2 contract storage MUST have a `big_map` with a key type `token_id` and
value type `token_metadata`. This `big_map` MUST be annotated as `%token_metadata`
and can be at any position within the storage.

##### `token_metadata` Entry Point

LIGO definition:

```ocaml
type token_metadata_param = {
  token_ids : token_id list;
  handler : (token_metadata_michelson list) -> unit;
}

| Token_metadata of token_metadata_param_michelson
```

<details>
<summary>where</summary>

```ocaml
type token_metadata_michelson = token_metadata michelson_pair_right_comb

type token_metadata_param_michelson = token_metadata_param michelson_pair_right_comb
```

Michelson definition:

```
(pair %token_metadata
  (list %token_ids nat)
  (lambda %handler
      (list
        (pair
          (nat %token_id)
          (pair
            (string %symbol)
            (pair
              (string %name)
              (pair
                (nat %decimals)
                (map %extras string string)
        ))))
      )
      unit
  )
)
```

</details>

Get the metadata for multiple token types. Accepts a list of `token_id`s and a
a lambda `handler`, which accepts a list of `token_metadata` records. The `handler`
lambda may assert certain assumptions about the metadata and/or fail with the
obtained metadata implementing a view entry point pattern to extract tokens metadata
off-chain.

- As with `balance_of`, the input `token_id`'s should not be deduplicated nor
  reordered.

- If one of the specified `token_id`s is not defined within the FA2 contract, the
  entry point MUST fail with the error mnemonic `"FA2_TOKEN_UNDEFINED"`.

### FA2 Permission Policies and Configuration

Most token standards specify logic such as who can perform a transfer, the amount
of a transfer, and who can receive tokens. This standard calls such logic _permission
policy_ and defines a framework to compose such permission policies from the
[standard behaviors](#permission-behaviors).

The FA2 contract developer can choose and implement a custom set of permissions
behaviors. The particular implementation may be static (the permissions configuration
cannot be changed after the contract is deployed) or dynamic (the FA2 contract
may be upgradable and allow to change the permissions configuration). At any moment
in time, the FA2 token contract MUST expose consistent and non-self-contradictory
permissions configuration (unlike ERC-777 that exposes two flavors of the transfer
at the same time).

#### A Taxonomy of Permission Policies

##### Permission Behaviors

Permission policy semantics are composed from several orthogonal behaviors.
The concrete policy is expressed as a combination of those behaviors. Each permission
policy defines a set of possible standard behaviors. An FA2 contract developer MAY
chose to implement one or more behaviors that are different from the default ones
depending on their business use case.

The FA2 defines the following standard permission behaviors, that can be chosen
independently, when an FA2 contract is implemented:

###### `Operator` Permission Behavior

This behavior specifies who is permitted to transfer tokens.

Potentially token transfers can be performed by the token owner or by an operator
permitted to transfer tokens on behalf of the token owner. An operator can transfer
any tokens in any amount on behalf of the owner.

```ocaml
type operator_transfer_policy =
  | No_transfer
  | Owner_transfer
  | Owner_or_operator_transfer (* default *)
```

- `No_transfer` - neither owner nor operator can transfer tokens. This permission
  configuration can be used for non-transferable tokens or for the FA2 implementation
  when a transfer can be performed only by some privileged and/or administrative
  account. The transfer operation MUST fail with the error mnemonic `"FA2_TX_DENIED"`.

- `Owner_transfer` - If `SENDER` is not the token owner, the transfer operation
  MUST fail with the error mnemonic `"FA2_NOT_OWNER"`.

- `Owner_or_operator_transfer` - allows transfer for the token owner or an operator
  permitted to manage tokens on behalf of the owner. If `SENDER` is not the token
  owner and not an operator permitted to manage tokens on behalf of the owner,
  the transfer operation MUST fail with the error mnemonic `"FA2_NOT_OPERATOR"`.
  The FA2 standard defines the entry point to manage operators associated with
  the token owner address ([`update_operators`](#update_operators)). Once an
  operator is added, it can manage all of its associated owner's tokens.

- If an operator transfer is denied (`No_transfer` or `Owner_transfer`),
  [`update_operators`](#update_operators) entry point MUST fail if invoked with the
  error mnemonic `"FA2_OPERATORS_UNSUPPORTED"`.

###### `Token Owner Hook` Permission Behavior

Each transfer operation accepts a batch that defines token owners that send tokens
(senders) and token owners that receive tokens (receivers). Token owner contracts
MAY implement either `fa2_token_sender` and/or `fa2_token_receiver` interfaces.
Those interfaces define a hook entry point that accepts transfer description and
invoked by the FA2 contract in the context of transfer, mint and burn operations.

Token owner permission can be configured to behave in one of the following ways:

```ocaml
type owner_hook_policy =
  | Owner_no_hook (* default *)
  | Optional_owner_hook
  | Required_owner_hook
```

- `Owner_no_hook` - ignore the owner hook interface.

- `Optional_owner_hook` - treat the owner hook interface as optional. If a token
  owner contract implements a corresponding hook interface, it MUST be invoked. If
  the hook interface is not implemented, it gets ignored.

- `Required_owner_hook` - treat the owner hook interface as required. If a token
  owner contract implements a corresponding hook interface, it MUST be invoked. If
  the hook interface is not implemented, the entire transfer transaction MUST fail.

- Sender and/or receiver hooks can approve the transaction or reject it
  by failing. If such a hook is invoked and failed, the whole transfer operation
  MUST fail.

- This policy can be applied to both token senders and token receivers. There are
  two owner hook interfaces, `fa2_token_receiver` and `fa2_token_sender`, that need
  to be implemented by token owner contracts to expose the owner's hooks to FA2 token
  contract.

- If a transfer failed because of the token owner permission behavior, the operation
  MUST fail with the one of the following error mnemonics:

| Error Mnemonic                  | Description                                                                                         |
| :------------------------------ | :-------------------------------------------------------------------------------------------------- |
| `"FA2_RECEIVER_HOOK_FAILED"`    | Receiver hook is invoked and failed. This error MUST be raised by the hook implementation           |
| `"FA2_SENDER_HOOK_FAILED"`      | Sender hook is invoked and failed. This error MUST be raised by the hook implementation             |
| `"FA2_RECEIVER_HOOK_UNDEFINED"` | Receiver hook is required by the permission behavior, but is not implemented by a receiver contract |
| `"FA2_SENDER_HOOK_UNDEFINED"`   | Sender hook is required by the permission behavior, but is not implemented by a sender contract     |

- `transfer_descriptor` type defined below can represent regular transfer, mint and
  burn operations.

| operation | `from_`                       | `to_`                           |
| :-------- | :---------------------------- | :------------------------------ |
| transfer  | MUST be `Some sender_address` | MUST be `Some receiver_address` |
| mint      | MUST be `None`                | MUST be `Some receiver_address` |
| burn      | MUST be `Some burner_address` | MUST be `None`                  |

- If all of the following conditions are met, the FA2 contract MUST invoke both
  `fa2_token_sender` and `fa2_token_receiver` entry points:

  - the token owner implements both `fa2_token_sender` and `fa2_token_receiver`
    interfaces
  - the token owner receives and sends some tokens in the same transfer operation
  - both sender and receiver hooks are enabled by the FA2 permissions policy

- If the token owner participates in multiple transfers within the transfer operation
  batch and hook invocation is required by the permissions policy, the hook MUST
  be invoked only once.

- The hooks MUST NOT be invoked in the context of the operation other than transfer,
  mint and burn.

- `transfer_descriptor_param.operator` MUST be initialized with the address that
  invoked the FA2 contract (`SENDER`).

A special consideration is required if FA2 implementation supports sender and/or
receiver hooks. It is possible that one of the token owner hooks will fail because
of the hook implementation defects or other circumstances out of control of the
FA2 contract. This situation may cause tokens to be permanently locked on the token
owner's account. One of the possible solutions could be the implementation of a
special administrative version of the mint and burn operations that bypasses owner's
hooks otherwise required by the FA2 contract permissions policy.

```ocaml
type transfer_destination_descriptor = {
  to_ : address option;
  token_id : token_id;
  amount : nat;
}

type transfer_descriptor = {
  from_ : address option;
  txs : transfer_destination_descriptor list
}

type transfer_descriptor_param = {
  batch : transfer_descriptor list;
  operator : address;
}

type fa2_token_receiver =
  | Tokens_received of transfer_descriptor_param_michelson

type fa2_token_sender =
  | Tokens_sent of transfer_descriptor_param_michelson
```

<details>
<summary>where</summary>

```ocaml
type transfer_destination_descriptor_michelson =
  transfer_destination_descriptor michelson_pair_right_comb

type transfer_descriptor_aux = {
  from_ : address option;
  txs : transfer_destination_descriptor_michelson list
}

type transfer_descriptor_michelson = transfer_descriptor_aux michelson_pair_right_comb

type transfer_descriptor_param_aux = {
  batch : transfer_descriptor_michelson list;
  operator : address;
}

type transfer_descriptor_param_michelson = transfer_descriptor_param_aux michelson_pair_right_comb
```

</details>

Michelson definition:

```
(pair
  (list %batch
    (pair
      (option %from_ address)
      (list %txs
        (pair
          (option %to_ address)
          (pair
            (nat %token_id)
            (nat %amount)
          )
        )
      )
    )
  )
  (address %operator)
)
```

##### Permission Policy Formulae

Each concrete implementation of the permission policy can be described by a formula
which combines permission behaviors in the following form:

```
Operator(?) * Receiver(?) * Sender(?)
```

For instance, `Operator(Owner_transfer) * Receiver(Owner_no_hook) * Sender(Owner_no_hook)`
formula describes the policy which allows only token owners to transfer their own
tokens.

`Operator(No_transfer) * Receiver(Owner_no_hook) * Sender(Owner_no_hook)` formula
represents non-transferable token (neither token owner, nor operators can transfer
tokens.

Permission token policy formula is expressed by the `permissions_descriptor` type.

```ocaml
type operator_transfer_policy =
  | No_transfer
  | Owner_transfer
  | Owner_or_operator_transfer

type owner_hook_policy =
  | Owner_no_hook
  | Optional_owner_hook
  | Required_owner_hook

type custom_permission_policy = {
  tag : string;
  config_api: address option;
}

type permissions_descriptor = {
  operator : operator_transfer_policy;
  receiver : owner_hook_policy;
  sender : owner_hook_policy;
  custom : custom_permission_policy option;
}
```

It is possible to extend permission policy with a `custom` behavior, which does
not overlap with already existing standard policies. This standard does not specify
exact types for custom config entry points. FA2 token contract clients that support
custom config entry points must know their types a priori and/or use a `tag` hint
of `custom_permission_policy`.

##### Customizing Permission Policy

The FA2 contract MUST always implement the [core transfer behavior](#core-transfer-behavior).
However, FA2 contract developer MAY chose to implement either the
[default transfer permission policy](#default-transfer-permission-policy) or a
custom policy.
The FA2 contract implementation MAY customize one or more of the standard permission
behaviors (`operator`, `receiver`, `sender` as specified in `permissions_descriptor`
type), by choosing one of the available options for those permission behaviors.

##### `permissions_descriptor` Entry Point

LIGO definition:

```ocaml
| Permissions_descriptor of permissions_descriptor_michelson contract
```

<details>
<summary>where</summary>

```ocaml
type operator_transfer_policy_michelson = operator_transfer_policy michelson_or_right_comb

type owner_hook_policy_michelson = owner_hook_policy michelson_or_right_comb

type custom_permission_policy_michelson = custom_permission_policy michelson_pair_right_comb

type permissions_descriptor_aux = {
  operator : operator_transfer_policy_michelson;
  receiver : owner_hook_policy_michelson;
  sender : owner_hook_policy_michelson;
  custom : custom_permission_policy_michelson option;
}

type permissions_descriptor_michelson = permissions_descriptor_aux michelson_pair_right_comb
```

</details>

Michelson definition:

```
(contract %permissions_descriptor
  (pair
    (or %operator
      (unit %no_transfer)
      (or
        (unit %owner_transfer)
        (unit %owner_or_operator_transfer)
      )
    )
    (pair
      (or %receiver
        (unit %owner_no_hook)
        (or
          (unit %optional_owner_hook)
          (unit %required_owner_hook)
        )
      )
      (pair
        (or %sender
          (unit %owner_no_hook)
          (or
            (unit %optional_owner_hook)
            (unit %required_owner_hook)
          )
        )
        (option %custom
          (pair
            (string %tag)
            (option %config_api address)
          )
        )
      )
    )
  )
)
```

Get the descriptor of the transfer permission policy. FA2 specifies
`permissions_descriptor` allowing external contracts (e.g. an auction) to discover
an FA2 contract's implemented permission policies.

The implicit value of the descriptor for the
[default `transfer` permission policy](#default-transfer-permission-policy) is
the following:

```ocaml
let default_descriptor : permissions_descriptor = {
  operator = Owner_or_operator_transfer;
  receiver = Owner_no_hook;
  sender = Owner_no_hook;
  custom = (None: custom_permission_policy option);
}
```

- If the FA2 contract implements one or more non-default behaviors, it MUST implement
  `permission_descriptor` entry point. The descriptor field values MUST reflect
  actual permission behavior implemented by the contract.

- If the FA2 contract implements the default permission policy, it MAY omit the
  implementation of the `permissions_descriptor` entry point.

- In addition to the standard permission behaviors, the FA2 contract MAY also
  implement an optional custom permissions policy. If such custom a policy is
  implemented, the FA2 contract SHOULD expose it using permissions descriptor
  `custom` field. `custom_permission_policy.tag` value would be available to
  other parties which are aware of such custom extension. Some custom permission
  MAY require a config API (like [`update_operators`](#update_operators) entry
  point of the FA2 to configure `operator_transfer_policy`). The address of the
  contract that provides config entry points is specified by
  `custom_permission_policy.config_api` field. The config entry points MAY be
  implemented either within the FA2 token contract itself (then the returned
  address SHALL be `SELF`), or in a separate contract.

### Error Handling

This specification defines the set of standard errors to make it easier to integrate
FA2 contracts with wallets, DApps and other generic software, and enable
localization of user-visible error messages.

Each error code is a short abbreviated string mnemonic. An FA2 contract client
(like another contract or a wallet) could use on-the-chain or off-the-chain registry
to map the error code mnemonic to a user-readable, localized message. A particular
implementation of the FA2 contract MAY extend the standard set of errors with custom
mnemonics for additional constraints.

Standard error mnemonics:

| Error mnemonic                  | Description                                                                                                                                              |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"FA2_TOKEN_UNDEFINED"`         | One of the specified `token_id`s is not defined within the FA2 contract                                                                                  |
| `"FA2_INSUFFICIENT_BALANCE"`    | A token owner does not have sufficient balance to transfer tokens from owner's account                                                                   |
| `"FA2_TX_DENIED"`               | A transfer failed because of `operator_transfer_policy == No_transfer`                                                                                   |
| `"FA2_NOT_OWNER"`               | A transfer failed because `operator_transfer_policy == Owner_transfer` and it is invoked not by the token owner                                          |
| `"FA2_NOT_OPERATOR"`            | A transfer failed because `operator_transfer_policy == Owner_or_operator_transfer` and it is invoked neither by the token owner nor a permitted operator |
| `"FA2_OPERATORS_UNSUPPORTED"`   | `update_operators` entry point is invoked and `operator_transfer_policy` is `No_transfer` or `Owner_transfer`                                            |
| `"FA2_RECEIVER_HOOK_FAILED"`    | The receiver hook failed. This error MUST be raised by the hook implementation                                                                           |
| `"FA2_SENDER_HOOK_FAILED"`      | The sender failed. This error MUST be raised by the hook implementation                                                                                  |
| `"FA2_RECEIVER_HOOK_UNDEFINED"` | Receiver hook is required by the permission behavior, but is not implemented by a receiver contract                                                      |
| `"FA2_SENDER_HOOK_UNDEFINED"`   | Sender hook is required by the permission behavior, but is not implemented by a sender contract                                                          |

If more than one error conditions are met, the entry point MAY fail with any applicable
error.

When error occurs, any FA2 contract entry point MUST fail with one of the following
types:

1. `string` value which represents an error code mnemonic.
2. a Michelson `pair`, where the first element is a `string` representing error code
   mnemonic and the second element is a custom error data.

Some FA2 implementations MAY introduce their custom errors that MUST follow the
same pattern as standard ones.

## Implementing Different Token Types With FA2

The FA2 interface is designed to support a wide range of token types and implementations.
This section gives examples of how different types of the FA2 contracts MAY be
implemented and what are the expected properties of such an implementation.

### Single Fungible Token

An FA2 contract represents a single token similar to ERC-20 or FA1.2 standards.

| Property        |   Constrains   |
| :-------------- | :------------: |
| `token_id`      |  Always `0n`   |
| transfer amount | natural number |
| account balance | natural number |
| total supply    | natural number |
| decimals        |     custom     |

### Multiple Fungible Tokens

An FA2 contract may represent multiple tokens similar to ERC-1155 standard.
The implementation can have a fixed predefined set of supported tokens or tokens
can be created dynamically.

| Property        |         Constrains          |
| :-------------- | :-------------------------: |
| `token_id`      |       natural number        |
| transfer amount |       natural number        |
| account balance |       natural number        |
| total supply    |       natural number        |
| decimals        | custom, per each `token_id` |

### Non-fungible Tokens

An FA2 contract may represent non-fungible tokens (NFT) similar to ERC-721 standard.
For each individual non-fungible token the implementation assigns a unique `token_id`.
The implementation MAY support either a single kind of NFTs or multiple kinds.
If multiple kinds of NFT is supported, each kind MAY be assigned a continuous range
of natural number (that does not overlap with other ranges) and have its own associated
metadata.

| Property        |                           Constrains                            |
| :-------------- | :-------------------------------------------------------------: |
| `token_id`      |                         natural number                          |
| transfer amount |                          `0n` or `1n`                           |
| account balance |                          `0n` or `1n`                           |
| total supply    |                          `0n` or `1n`                           |
| decimals        | `0n` or a natural number if a token represents a batch of items |

For any valid `token_id` only one account CAN hold the balance of one token (`1n`).
The rest of the accounts MUST hold zero balance (`0n`) for that `token_id`.

### Mixing Fungible and Non-fungible Tokens

An FA2 contract MAY mix multiple fungible and non-fungible tokens within the same
contract similar to ERC-1155. The implementation MAY chose to select individual
natural numbers to represent `token_id` for fungible tokens and continuous natural
number ranges to represent `token_id`s for NFTs.

| Property        |                         Constrains                          |
| :-------------- | :---------------------------------------------------------: |
| `token_id`      |                       natural number                        |
| transfer amount | `0n` or `1n` for NFT and natural number for fungible tokens |
| account balance | `0n` or `1n` for NFT and natural number for fungible tokens |
| total supply    | `0n` or `1n` for NFT and natural number for fungible tokens |
| decimals        |                           custom                            |

### Non-transferable Tokens

Either fungible and non-fungible tokens can be non-transferable. Non-transferable
tokens can be represented by the FA2 contract which [operator transfer behavior](#operator-transfer-behavior)
is defined as `No_transfer`. Tokens cannot be transferred neither by the token owner
nor by any operator. Only privileged operations like mint and burn can assign tokens
to owner accounts.

## Future Directions

Future amendments to Tezos are likely to enable new functionality by which this
standard can be upgraded. Namely, [read-only
calls](https://forum.tezosagora.org/t/adding-read-only-calls/1227), event logging,
and [contract signatures](https://forum.tezosagora.org/t/contract-signatures/1458), now known as "tickets".

## Copyright

Copyright and related rights waived via
[CC0](https://creativecommons.org/publicdomain/zero/1.0/).
