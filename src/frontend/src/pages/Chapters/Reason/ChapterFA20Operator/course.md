# Chapter 24 : Financial Asset 2.0 - Operators and Permissions

<dialog character="mechanics">Captain, why are you trying to change the part yourself? Just write a function on the terminal and send it to a droid.</dialog>

## Definition

The FA2 standard proposes a *unified token contract interface* that accommodates all mentioned concerns. It aims to provide significant expressivity to contract developers to create new types of tokens while maintaining a common interface standard for wallet integrators and external developers.

In this chapter we will focus on _Operators_ and _Permissions_.

## Entry points

Token contract implementing the FA2 standard MUST have the following entry points.

```
type parameter = 
| Transfer(transferParameter)
| Balance_of(balanceOfParameterMichelson)
| Permissions_descriptor(permissionsDescriptorParameter)
| Update_operators(updateOperatorsParameter)
```

### Operators

#### Definition
_Operator_ can be seen as delegate role.

_Operator_ is a Tezos address that initiates token transfer operation on behalf of the owner.
_Owner_ is a Tezos address which can hold tokens.
An operator, other than the owner, MUST be approved to manage particular token types held by the owner to make a transfer from the owner account.
Operator relation is not transitive. If C is an operator of B , and if B is an operator of A, C cannot transfer tokens that are owned by A, on behalf of B.

an _operator_ is defined as a relationship between two address (owner address and operator address) and can be understood as an operator address who can operate tokens held by a owner.

#### FA2 interface operator

FA2 interface specifies two entry points to update and inspect operators. Once permitted for the specific token owner, an operator can transfer any tokens belonging to the owner.

```
| Update_operators(updateOperatorsParameter)
```

<!-- prettier-ignore -->where parameter type *updateOperatorsParameter* is :
```
type operatorParameter = {
    owner: tokenOwner,
    operator: tokenOperator,
}

type updateOperatorsAddOrRemove =
// There's an extra `_p` in the constructors below to avoid 'redundant constructor' error 
// due to the interop type conversions below
| Add_operator_p(operatorParameter)
| Remove_operator_p(operatorParameter)

type operatorParameterMichelson = michelson_pair_right_comb(operatorParameter);

type updateOperatorsAddOrRemoveAuxiliary =
| Add_operator(operatorParameterMichelson)
| Remove_operator(operatorParameterMichelson)

type updateOperatorsAddOrRemoveMichelson = michelson_or_right_comb(updateOperatorsAddOrRemoveAuxiliary);

type updateOperatorsParameter = list(updateOperatorsAddOrRemoveMichelson);
```

<!-- prettier-ignore -->Notice the *updateOperatorsAddOrRemove* can only Add or Remove an _operator_ (an allowance between an operator address and a token owner address).

<!-- prettier-ignore -->Notice entry point *Update\_operators* expects a list of *updateOperatorsAddOrRemoveMichelson*. The fa2 convertor helper provide the *updateOperatorsIterator* function to iterate *updateOperatorsAddOrRemoveMichelson* format. 


#### FA2 standard operator library

Some helpers functions has been implemented in the FA2 library which help manipulating _operator_. This library contains following functions and type alias :


an _operator_ is a relationship between two address (owner address and operator address)

<!-- prettier-ignore -->function *updateOperators* allows to Add or Remove an operator in the list of operators.

<!-- prettier-ignore -->Some helper function can be added such as *canUpdateOperators*, it ensures the given address is owner of an _operator_ 

```
let canUpdateOperators = ((tokenOwner, storage): (tokenOwner, storage)): unit => {
    if (Tezos.sender != tokenOwner) {
        failwith(errorOperatorUpdateDenied)
    } else { (); }
}
```

<!-- prettier-ignore -->Some helper function can be added such as *isOperator*, verifies if a given address is registered as operator for a given owner 

```
let isOperator = ((tokenOwner, tokenOperator, storage): (tokenOwner, tokenOperator, storage)): bool => {
    let tokenOperatorsSet: option(tokenOperatorsSet) = Map.find_opt(tokenOwner, storage.tokenOperators);
    switch(tokenOperatorsSet) {
        | None => false
        | Some(tokenOperatorsSet) => Set.mem(tokenOperator, tokenOperatorsSet);
    }
}
```

// TOTO : verify equivalent !
<!-- prettier-ignore -->function *validate\_operator* validates operators for all transfers in the batch at once, depending on given *operatorTransferPolicy*



### FA2 Permission Policies and Configuration

Most token standards specify logic that validates a transfer transaction and can either approve or reject a transfer. 
Such logic (called _Permission Policy_) could validate who initiates a transfer, the transfer amount, and who can receive tokens.

This FA2 standard defines a framework to compose and configure such permission policies from the standard behaviors and configuration APIs.

FA2 defines :
* the default core transfer behavior, that MUST always be implemented
* a set of predefined permission policies that are optional


#### permissions_descriptor

<!-- prettier-ignore -->FA2 specifies an interface *permissions\_descriptor* allowing external contracts to discover an FA2 contract's permission policy and to configure it. *permissions\_descriptor* serves as a modular approach to define consistent and non-self-contradictory policies.

The *permission descriptor* indicates which standard permission policies are implemented by the FA2 contract and can be used by off-chain and on-chain tools to discover the properties of the particular FA2 contract implementation.

The FA2 standard defines a special metadata entry point *permission descriptor* containing standard permission policies. 

```
| Permissions_descriptor(permissionsDescriptorParameter)
```

```
type permissionsDescriptor = {
    operator: operatorTransferPolicy,
    receiver: ownerHookPolicy,
    sender: ownerHookPolicy,
    custom: option(customPermissionPolicy)
}
```


#### operator_transfer_policy

<!-- prettier-ignore -->*operatorTransferPolicy* - defines who can transfer tokens. Tokens can be transferred by the token owner or an operator (some address that is authorized to transfer tokens on behalf of the token owner). A special case is when neither owner nor operator can transfer tokens (can be used for non-transferable tokens). 

<!-- prettier-ignore -->The FA2 standard defines an entry point to manage operators associated with the token owner address (*update\_operators*). Once an operator is added, it can manage all of its associated owner's tokens.

```
type operatorTransferPolicy =
| No_transfer
| Owner_transfer
| Owner_or_operator_transfer // default
```

#### owner_hook_policy

<!-- prettier-ignore -->*ownerHookPolicy* - defines if sender/receiver hooks should be called or not. Each token owner contract MAY implement either an *fa2\_token\_sender* or *fa2\_token\_receiver* hook interface. Those hooks MAY be called when a transfer sends tokens from the owner account or the owner receives tokens. The hook can either accept a transfer transaction or reject it by failing.

```
type ownerHookPolicy =
| Owner_no_hook // default
| Optional_owner_hook
| Required_owner_hook

```

#### custom_permission_policy

<!-- prettier-ignore -->It is possible to extend permission policy with a custom behavior, which does not overlap with already existing standard policies. This standard does not specify exact types for custom config entry points. FA2 token contract clients that support custom config entry points must know their types a priori and/or use a tag hint of *customPermissionPolicy*.

```
type customPermissionPolicy = {
    tag: string,
    config_api: option(address)
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

#### interface 

Updating permissions requires specific parameters, and thus follow these type definitions.

```
type operatorTransferPolicyMichelson = michelson_or_right_comb(operatorTransferPolicy);
type ownerHookPolicyMichelson = michelson_or_right_comb(ownerHookPolicy);
type customPermissionPolicyMichelson = michelson_pair_right_comb(customPermissionPolicy);

type permissionsDescriptorAuxiliary = {
    operator: operatorTransferPolicyMichelson,
    receiver: ownerHookPolicyMichelson,
    sender: ownerHookPolicyMichelson,
    custom: option(customPermissionPolicyMichelson)
}

type permissionsDescriptorMichelson = michelson_pair_right_comb(permissionsDescriptorAuxiliary);

type permissionsDescriptorParameter = contract(permissionsDescriptorMichelson);
```




## Your mission

We are working on a non_fungible/single-asset token.
Our NFT "token" is almost ready but to allow a new rule. We need Bob to transfert a token taken from Vera account and send it to Alice account.

  * Alice's account address is "tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN"
  * Bob's account address is "tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU"
  * Vera's account address is "tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv"

<!-- prettier-ignore -->1- First we want you to prepare the initial state of storage. Modify the _ligo compile-storage_ command for the *token* contract with following recommandations :

  * Vera account is owner of the token 1

<!-- prettier-ignore -->2- Complete the _ligo dry-run_ command for authorizing Bob to transfer token taken from Vera account, transaction emitted by Vera. (reuse the storage you made on step 1). You can use *Layout.convert\_to\_right\_comb* function to convert your parameters into the format expected by *Update\_operators* entry point.


<!-- prettier-ignore -->3- Complete the _ligo dry-run_ command for simulating the transfer of 1 token from Vera'account to Alice's account, transaction emitted by Bob. The transfered token id is number 1. You can use the *Layout.convert\_to\_right\_comb* function to convert your parameters into the format expected by *Transfer* entry point.
You will have to modify the storage to in the state where "Vera account is owner of the token 1" (step 1) and Bob is authorized to transfer token taken from Vera account (step 2).
