# Chapter 29 : FA 2.0 - Operators and Permissions

<dialog character="mechanics">Captain, why are you trying to change the part yourself? Just write a function on the terminal and send it to a droid.</dialog>

## Definition

The FA2 standard proposes a _unified token contract interface_ that accommodates all mentioned concerns. It aims to provide significant expressivity to contract developers to create new types of tokens while maintaining a common interface standard for wallet integrators and external developers.

In this chapter we will focus on _Operators_ and _Permissions_.

## Entry points

A Token contract implementing the FA2 standard MUST have the following entry points.

```
type fa2_entry_points =

| Transfer of transfer list
| Balance_of of balance_of_param
| Total_supply of total_supply_param
| Token_metadata of token_metadata_param
| Permissions_descriptor of permissions_descriptor contract
| Update_operators of update_operator list
| Is_operator of is_operator_param
```

### Operators

#### Definition

An _Operator_ can be seen as a delegate role.

An _Operator_ is a Tezos address that initiates token transfer operation on behalf of the owner.
An _Owner_ is a Tezos address which can hold tokens.
An operator, other than the owner, MUST be approved to manage particular token types held by the owner to make a transfer from the owner account.
_Operator_ relation is not transitive. If C is an operator of B , and if B is an operator of A, C cannot transfer tokens that are owned by A, on behalf of B.

An _Operator_ is defined as a relationship between two address (owner address and operator address) and can be understood as an operator address which can operate tokens held by an owner.

#### FA2 interface operator

The FA2 interface specifies two entry points to update and inspect operators. Once permitted for the specific token owner, an operator can transfer any tokens belonging to the owner.

```
| Update_operators of update_operator_michelson list
| Is_operator of is_operator_param
```

<!-- prettier-ignore -->where parameter type *update\_operator* and *is\_operator\_param* are :

```
type operator_param = {
  owner : address;
  operator : address;
}

type update_operator =
  | Add_operator_p of operator_param
  | Remove_operator_p of operator_param

type is_operator_param = {
  operator : operator_param;
  callback : (is_operator_response_michelson) contract;
}
```

<!-- prettier-ignore -->Notice that the *update\_operator* can only Add or Remove an _operator_ (an allowance between an operator address and a token owner address).

<!-- prettier-ignore -->Notice that the parameter _is\_operator\_param_ given to *Is\_operator* entry point contains a *callback* property used to send back a response to the calling contract.

<!-- prettier-ignore -->Notice that the entry point *Update\_operators* expects a list of *update\_operator\_michelson*. The FA2 standard provides the *operator\_param\_to\_michelson* function to convert *operator\_param* format into *update\_operator\_michelson* format.

#### FA2 standard operator library

Some helper functions has been implemented in the FA2 library which help manipulating _operator_ relationship. This library contains following functions and type alias :

an _operator_ is a relationship between two address (owner address and operator address)

<!-- prettier-ignore -->function *is\_operator* returns to a contract caller whether an operator address is associated to an owner address

<!-- prettier-ignore -->function *update\_operators* allows to Add or Remove an operator in the list of operators.

<!-- prettier-ignore -->function *validate\_update\_operators\_by\_owner*, it ensures the given adress is owner of an _operator_

<!-- prettier-ignore -->function *validate\_operator* validates operators for all transfers in the batch at once, depending on given *operator\_transfer\_policy*

### FA2 Permission Policies and Configuration

Most token standards specify logic that validates a transfer transaction and can either approve or reject a transfer.
Such logic (called _Permission Policy_) could validate who initiates a transfer, the transfer amount, and who can receive tokens.

This FA2 standard defines a framework to compose and configure such permission policies.

The FA2 standard defines :

- the default core transfer behavior, that MUST always be implemented
- a set of predefined permission policies that are optional

#### Permissions descriptor

<!-- prettier-ignore -->The FA2 standard specifies an interface permissions_descriptor allowing external contracts to discover an FA2 contract's permission policy and to configure it. *permissions\_descriptor* serves as a modular approach to define consistent and non-self-contradictory policies.

The _permission descriptor_ indicates which standard permission policies are implemented by the FA2 contract and can be used by off-chain and on-chain tools to discover the properties of the particular FA2 contract implementation.

The FA2 standard defines a special metadata entry point _permission descriptor_ containing standard permission policies.

```
type permissions_descriptor = {
  operator : operator_transfer_policy;
  receiver : owner_hook_policy;
  sender : owner_hook_policy;
  custom : custom_permission_policy option;
}
```

#### Operator transfer policy

<!-- prettier-ignore -->*operator\_transfer\_policy* - defines who can transfer tokens. Tokens can be transferred by the token owner or an operator (some address that is authorized to transfer tokens on behalf of the token owner). A special case is when neither owner nor operator can transfer tokens (can be used for non-transferable tokens).

<!-- prettier-ignore -->The FA2 standard defines two entry points to manage and inspect operators associated with the token owner address (*update\_operators*, *is\_operator*). Once an operator is added, it can manage all of its associated owner's tokens.

```
type operator_transfer_policy =
  | No_transfer
  | Owner_transfer
  | Owner_or_operator_transfer
```

#### Owner hook policy

<!-- prettier-ignore -->*owner\_hook\_policy* - defines if sender/receiver hooks should be called or not. Each token owner contract MAY implement either an *fa2\_token\_sender* or *fa2\_token\_receiver* hook interface. Those hooks MAY be called when a transfer sends tokens from the owner account or the owner receives tokens. The hook can either accept a transfer transaction or reject it by failing.

```
type owner_hook_policy =
  | Owner_no_hook
  | Optional_owner_hook
  | Required_owner_hook
```

#### Custom permission policy

<!-- prettier-ignore -->It is possible to extend a permission policy with a custom behavior, which does not overlap with already existing standard policies. This standard does not specify exact types for custom config entry points. FA2 token contract clients that support custom config entry points must know their types a priori and/or use a tag hint of *custom\_permission\_policy*.

```
type custom_permission_policy = {
  tag : string;
  config_api: address option;
}
```

#### Permission Policy Formulae

Each concrete implementation of the permission policy can be described by a formula which combines permission behaviors in the following form:

```
Operator(?) * Receiver(?) * Sender(?)
```

This formula describes the policy which allows only token owners to transfer their own
tokens :

```
Operator(Owner_transfer) * Receiver(Owner_no_hook) * Sender(Owner_no_hook)
```

## Your mission

We are working on a non_fungible/single-asset token.
Our NFT "token" is almost ready but to allow a new rule. We need Bob to transfert a token taken from Vera account and send it to Alice account.

- Alice's account address is "tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN"
- Bob's account address is "tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU"
- Vera's account address is "tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv"

<!-- prettier-ignore -->1- First we want you to prepare the initial state of storage. Modify the _ligo compile-storage_ command for the *token* contract with following recommandations :

- Vera account is owner of the token 1

<!-- prettier-ignore -->2- Complete the _ligo dry-run_ command for authorizing Bob to transfer tokens taken from Vera account, transaction emitted by Vera. (reuse the storage you made on step 1). You can use *operator\_update\_to\_michelson* function to convert your parameters into the format expected by *Update\_operators* entry point.

<!-- prettier-ignore -->3- Complete the _ligo dry-run_ command for simulating the transfer of 1 token from Vera'account to Alice's account, transaction emitted by Bob. The transfered token id is number 1 (token\_id and and amount must be 1). You can use the *transfer\_to\_michelson* function to convert your parameters into the format expected by *Transfer* entry point.

You will have to modify the storage accordingly:
- "Vera account is owner of the token 1" (step 1)
- "Bob is authorized to transfer tokens taken from Vera account" (step 2).
