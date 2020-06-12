# Chapter 23 : Financial Asset 2.0 

<dialog character="mechanics">Captain, Let's create a ship token.</dialog>

## Definition

There are multiple dimensions and considerations while implementing a particular token smart contract. Tokens might be fungible or non-fungible. A variety of
permission policies can be used to define how many tokens can be transferred, who can initiate a transfer, and who can receive tokens. A token contract can be
designed to support a single token type (e.g. ERC-20 or ERC-721) or multiple token types (e.g. ERC-1155) to optimize batch transfers and atomic swaps of the tokens.

The FA2 standard proposes a *unified token contract interface* that accommodates all mentioned concerns. It aims to provide significant expressivity to contract developers to create new types of tokens while maintaining a common interface standard for wallet integrators and external developers.

In the following chapter on Financial Asset 2.0 , we will focus on *TZIP-12* which stands for the 12th Tezos Improvement Proposal (same as EIP-721 for Ethereum).

## Architecture

FA2 proposes to leave it to implementers to handle common considerations such as defining the contract’s token type(s) (e.g. non-fungible vs. fungible vs. semi-fungible), administration and whitelisting, contract upgradability, and supply operations (e.g. mint/burn).

FA2 also leaves to implementers to decide on architecture pattern for handling permissioning. Permission can be implemented 
* in the the same contract as the core transfer behavior (i.e. a “monolith”), 
* in a transfer hook to another contract, 
* in a separate wrapper contract.


## Interface and library

The FA2 interface formalize a standard way to design tokens and thus describes a list of entry points (that must be implemented) and data structures related to those entry points. A more detailed decription of the interface is broken down in following sections.

In addition to the FA2 interface, the FA2 standard provides helper functions to manipulate data structures involved in FA2 interface. The FA2 library contains helper functions for :
* a generic behavior and transfer hook implementation (behavior based on *permissions_descriptor*), 
* converting data structures, 
* defining hooks between contracts when transfer is emitted, 
* defining operators for managing allowance. 

## Entry points

Token contract implementing the FA2 standard MUST have the following entry points.

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


### Metadata

FA2 token contracts MUST implement the *token_metadata* entry point which get the metadata for multiple token types.

It accepts a list of *token_ids* and a callback contract, and sends back a list of *token_metadata* records.

FA2 token amounts are represented by natural numbers (nat), and their granularity (the smallest amount of tokens which may be minted, burned, or
transferred) is always 1.

The *decimals* property is the number of digits to use after the decimal point when displaying the token amounts. If 0, the asset is not divisible. Decimals are used for display purposes only and MUST NOT affect transfer operation.


#### Interface

```
type token_metadata = {
  token_id : token_id;
  symbol : string;
  name : string;
  decimals : nat;
  extras : (string, string) map;
}

type token_metadata_michelson = token_metadata michelson_pair_right_comb

type token_metadata_param = {
  token_ids : token_id list;
  callback : (token_metadata_michelson list) contract;
}
```


### Balance of

FA2 token contracts MUST implement the _Balance of_ entry point which get the balance of multiple account/token pairs (because FA2 supports mutiple token).  
```
| Balance_of of balance_of_param
```

It accepts a list of balance_of_requests and a callback and sends back to a callback contract a list of balance_of_response records. 

If one of the specified token_ids is not defined within the FA2 contract, the entry point MUST fail with the error mnemonic "TOKEN_UNDEFINED" (see section Error Handling).

#### Interface

The FA2 interface defines request/response parameters as follow :
```
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
```

### Totalsupply

FA2 token contracts MUST implement the _Totalsupply_ entry point which get the total supply of tokens for multiple token types  (because FA2 supports mutiple token).
```
| Total_supply of total_supply_param
```

It accepts a list of *token_ids* and a callback, and sends back to the callback contract a list of *total_supply_response* records.

If one of the specified token_ids is not defined within the FA2 contract, the entry point MUST fail with the error mnemonic "TOKEN_UNDEFINED" (see section Error Handling).

#### Interface

```
type token_id = nat

type total_supply_response = {
  token_id : token_id;
  total_supply : nat;
}

type total_supply_response_michelson = total_supply_response michelson_pair_right_comb

type total_supply_param = {
  token_ids : token_id list;
  callback : (total_supply_response_michelson list) contract;
}
```

### Transfer

FA2 token contracts MUST implement the _Transfer_ entry point which transfer tokens between and MUST ensure following rules.
```
| Transfer of transfer list
```

#### Rules

FA2 token contracts MUST implement the transfer logic defined by the following rules : 


1) Every transfer operation MUST be atomic. If the operation fails, all token transfers MUST be reverted, and token balances MUST remain unchanged.

2) The amount of a token transfer MUST NOT exceed the existing token owner's balance. If the transfer amount for the particular token type and token owner
exceeds the existing balance, the whole transfer operation MUST fail with the error mnemonic "INSUFFICIENT_BALANCE"

3) Core transfer behavior MAY be extended. If additional constraints on tokens transfer are required, FA2 token contract implementation MAY invoke additional
permission policies (transfer hook is the recommended design pattern to implement core behavior extension). (See Chapter FA2 - Hook)

If the additional permission hook fails, the whole transfer operation MUST fail with a custom error mnemonic.

4) Core transfer behavior MUST update token balances exactly as the operation parameters specify it. No changes to amount values or additional transfers are
allowed.



#### Interface

It transfer tokens from a *from_* account to possibly many destination accounts where each destination transfer describes the type of token, the amount of token, and receiver address.

```
type token_id = nat

type transfer_destination = {
  to_ : address;
  token_id : token_id;
  amount : nat;
}

type transfer_destination_michelson = transfer_destination michelson_pair_right_comb

type transfer = {
  from_ : address;
  txs : transfer_destination list;
}

type transfer_aux = {
  from_ : address;
  txs : transfer_destination_michelson list;
}
```

### Error Handling

This FA2 tandard defines the set of standard errors to make it easier to integrate FA2 contracts with wallets, DApps and other generic software, and enable
localization of user-visible error messages.

Each error code is a short abbreviated string mnemonic. An FA2 contract client (like another contract or a wallet) could use on-the-chain or off-the-chain registry to map the error code mnemonic to a user-readable, localized message. 

A particular implementation of the FA2 contract MAY extend the standard set of errors with custom mnemonics for additional constraints.

When error occurs, any FA2 contract entry point MUST fail with one of the following types:
* string value which represents an error code mnemonic.
* a Michelson pair, where the first element is a string representing error code mnemonic and the second element is a custom error data.

#### Standard error mnemonics:

Error mnemonic - Description

"TOKEN_UNDEFINED" - One of the specified token_ids is not defined within the FA2 contract

"INSUFFICIENT_BALANCE" - A token owner does not have sufficient balance to transfer tokens from owner's account

"TX_DENIED" - A transfer failed because of operator_transfer_policy == No_transfer

"NOT_OWNER" - A transfer failed because operator_transfer_policy == Owner_transfer and it is initiated not by the token owner

"NOT_OPERATOR" - A transfer failed because operator_transfer_policy == Owner_or_operator_transfer and it is initiated neither by the token owner nor a permitted operator

"RECEIVER_HOOK_FAILED" - The receiver hook failed. This error MUST be raised by the hook implementation

"SENDER_HOOK_FAILED" - The sender failed. This error MUST be raised by the hook implementation

"RECEIVER_HOOK_UNDEFINED" -Receiver hook is required by the permission behavior, but is not implemented by a receiver contract

"SENDER_HOOK_UNDEFINED" - Sender hook is required by the permission behavior, but is not implemented by a sender contract



## Your mission

We are working on a fungible/multi-asset token compliant with the FA2 standard. We want you to complete the existing implementation of token. The Total_supply entry point is not yet implemented , please finish the job !

<!-- prettier-ignore -->1 - Modify the *get_total_supply* lambda function in order to retrieve the total_supply information related to the given *token_id* list.

<!-- prettier-ignore -->2 - the *get_total_supply* lambda function For each given token_id, find the given *token_id* in the *tokens* map and retrieve the *total_supply* associated to a given *token_id* in the *tokens* map.

<!-- prettier-ignore -->3 -If a given token_id is found then the function *get_total_supply* must return a *total_supply_response* record for each given *token_id*. As seen in the interface the *total_supply_response* record contains *token_id* and *total_supply* fields. (use v as temporary variable for the match with instruction)

<!-- prettier-ignore -->4 -If a given token_id is not found then the function *get_total_supply* must throw an exception with the predefined error messsage *token_undefined*.

