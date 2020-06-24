
# Implementing FA2

## Transfer Hook

Transfer hook is one recommended design pattern to implement FA2 that enables
separation of the core token transfer logic and a permission policy. Instead of
implementing FA2 as a monolithic contract, a [permission policy]
(#fa2-permission-policies-and-configuration) can be implemented as a separate
contract. Permission policy contract provides an entry point invoked by the core
FA2 contract to accept or reject a particular transfer operation (such
an entry point is called **transfer hook**).

### Transfer Hook Motivation

Usually, different tokens require different permission policies that define who
can transfer and receive tokens. There is no single permission policy that fits
all scenarios. For instance, some game tokens can be transferred by token owners,
but no one else. In some financial token exchange applications, tokens are to be
transferred by a special exchange operator account, not directly by the token owners
themselves.

Support for different permission policies usually requires customizing existing
contract code. The FA2 standard proposes a different approach in which the on-chain
composition of the core FA2 contract implementation does not change, and a pluggable
permission transfer hook is implemented as a separate contract and registered with
the core FA2. Every time FA2 performs a transfer, it invokes a hook contract that
validates a transaction and either approves it by finishing execution successfully
or rejects it by failing.

The transfer hook makes it possible to model different transfer permission
policies like whitelists, operator lists, etc. Although this approach introduces
gas consumption overhead (compared to an all-in-one contract) by requiring an extra
inter-contract call, it also offers some other advantages:

* FA2 core implementation can be verified once, and certain properties (not
  related to permission policy) remain unchanged.

* Most likely, the core transfer semantic will remain unchanged. If
  modification of the permission policy is required for an existing contract, it
  can be done by replacing a transfer hook only. No storage migration of the FA2
  ledger is required.

* Transfer hooks could be used for purposes beyond permissioning, such as
  implementing custom logic for a particular token application.

### Transfer Hook Specification

An FA2 token contract has a single entry point to set the hook. If a transfer hook
is not set, the FA2 token contract transfer operation MUST fail. Transfer hook is
to be set by the token contract administrator before any transfers can happen.
The concrete token contract implementation MAY impose additional restrictions on
who may set the hook. If the set hook operation is not permitted, it MUST fail
without changing existing hook configuration.

For each transfer operation, a token contract MUST invoke a transfer hook and
return a corresponding operation as part of the transfer entry point result.
(For more details see [`set_transfer_hook`](#set_transfer_hook) )

`operator` parameter for the hook invocation MUST be set to `SENDER`.

`from_` parameter for each `hook_transfer` batch entry MUST be set to `Some(transfer.from_)`.

`to_` parameter for each `hook_transfer` batch entry MUST be set to `Some(transfer.to_)`.

A transfer hook MUST be invoked, and operation returned by the hook invocation
MUST be returned by `transfer` entry point among other operations it might create.
`SENDER` MUST be passed as an `operator` parameter to any hook invocation. If an
invoked hook fails, the whole transfer transaction MUST fail.

FA2 does NOT specify an interface for mint and burn operations; however, if an
FA2 token contract implements mint and burn operations, these operations MUST
invoke a transfer hook as well.

|  Mint | Burn |
| :---- | :--- |
| Invoked if registered. `from_` parameter MUST be `None` | Invoked if registered. `to_` parameter MUST be `None`|

Note that using the transfer hook design pattern with sender/receiver hooks may
potentially be insecure. Sender and/or receiver contract hooks will be called
from the transfer hook contract (not the facade FA2 token contract). If sender/receiver
contracts rely on `SENDER` value for authorization, they must guarantee that the
call is initiated on behalf of the FA2 contract.

### `set_transfer_hook`

FA2 entry point with the following signature.

LIGO definition:

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

type set_hook_param = {
  hook : unit -> transfer_descriptor_param_michelson contract;
  permissions_descriptor : permissions_descriptor;
}

| Set_transfer_hook of set_hook_param_michelson
```

where

```ocaml
type transfer_destination_descriptor_michelson =
  transfer_destination_descriptor michelson_pair_right_comb

type transfer_descriptor_aux = {
  from_ : address option;
  txs : transfer_destination_descriptor_michelson list
}

type transfer_descriptor_michelson = transfer_descriptor_aux michelson_pair_right_comb

type transfer_descriptor_param_aux = {
  fa2 : address;
  batch : transfer_descriptor_michelson list;
  operator : address;
}

type transfer_descriptor_param_michelson = transfer_descriptor_param_aux michelson_pair_right_comb

type set_hook_param_aux = {
  hook : unit -> transfer_descriptor_param_michelson contract;
  permissions_descriptor : permissions_descriptor_michelson;
}

type set_hook_param_michelson = set_hook_param_aux michelson_pair_right_comb
```

Michelson definition:

```
(pair %set_transfer_hook
  (lambda %hook
    unit
    (contract
      (pair
        (address %fa2)
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
      )
    )
  )
  (pair %permissions_descriptor
    (or %operator
      (unit %no_transfer)
      (or
        (unit %owner_transfer)
        (unit %owner_or_operator_transfer)
      )
    )
    (pair
      (or %receiver
        (unit %owner_no_op)
        (or
          (unit %optional_owner_hook)
          (unit %required_owner_hook)
        )
      )
      (pair
        (or %sender
          (unit %owner_no_op)
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

FA2 implementation MAY restrict access to this operation to a contract administrator
address only.

The parameter is an address plus hook entry point of type
`transfer_descriptor_param`.

The transfer hook is always invoked from the `transfer` operation; otherwise, FA2
MUST fail.

`hook` field in `set_hook_param` record is a lambda which returns a hook entry
point of type `transfer_descriptor_param`. It allows a policy contract implementor
to choose a name for the hook entry point or even implement several transfer hooks
in the same contract.

### Transfer Hook Examples

#### Default Permission Policy

Only a token owner can initiate a transfer of tokens from their accounts ( `from_`
MUST be equal to `SENDER`).

Any address can be a recipient of the token transfer.

[Hook contract](./examples/fa2_default_hook.mligo)

#### Custom Receiver Hook/White List Permission Policy

This is a sample implementation of the FA2 transfer hook, which supports receiver
whitelist and `fa2_token_receiver` for token receivers. The hook contract also
supports [operators](#operator-transfer-behavior).

Only addresses that are whitelisted or implement the `fa2_token_receiver` interface
can receive tokens. If one or more `to_` addresses in FA2 transfer batch are not
permitted, the whole transfer operation MUST fail.

The following table demonstrates the required actions depending on `to_` address
properties.

| `to_` is whitelisted | `to_` implements `fa2_token_receiver` interface | Action |
| ------ | ----- | ----------|
| No  | No  | Transaction MUST fail |
| Yes | No  | Continue transfer |
| No  | Yes | Continue transfer, MUST call `tokens_received` |
| Yes | Yes | Continue transfer, MUST call `tokens_received` |

Permission policy formula `S(true) * O(true) * ROH(None) * SOH(Custom)`.

[Hook contract](./examples/fa2_custom_receiver.mligo)
