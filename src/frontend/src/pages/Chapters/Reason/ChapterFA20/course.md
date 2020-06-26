# Chapter 28 : Financial Asset 2.0 

<dialog character="mechanics">Captain, Let's create a ship token.</dialog>

## Definition

There are multiple dimensions and considerations while implementing a particular token smart contract. Tokens might be fungible or non-fungible. A variety of permission policies can be used to define how many tokens can be transferred, who can initiate a transfer, and who can receive tokens. A token contract can be designed to support a single token type (e.g. ERC-20 or ERC-721) or multiple token types (e.g. ERC-1155) to optimize batch transfers and atomic swaps of the tokens.

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
<!-- prettier-ignore -->* a generic behavior and transfer hook implementation (behavior based on *permissions\_descriptor*), 
* converting/manipulating data structures, 
* defining hooks between contracts when transfer is emitted, 
* defining operators for managing allowance. 

## Entry points

Token contract implementing the FA2 standard MUST have the following entry points.

TODO should be renamed fa2_entry_points
```
type parameter = 
| Transfer(transferParameter)
| Balance_of(balanceOfParameterMichelson)
| Permissions_descriptor(permissionsDescriptorParameter)
| Update_operators(updateOperatorsParameter)
```

### Balance of

The FA2 client (contracts using our token) may need to know the balance of a owner. The FA2 standard specifies an entry point _Balance of_ which use a callback in order to send the balance information to the calling contract. 

<!-- prettier-ignore -->FA2 token contracts MUST implement the _Balance of_ entry point which get the balance of multiple account/token pairs (because FA2 supports mutiple token).  
```
| Balance_of of balance_of_param
```

<!-- prettier-ignore -->It accepts a list of *balance\_of\_requests* and a callback and sends back to a callback contract a list of *balance\_of\_response* records. 

<!-- prettier-ignore -->If one of the specified *token\_ids* is not defined within the FA2 contract, the entry point MUST fail with the error mnemonic "TOKEN_UNDEFINED" (see section Error Handling).

#### Interface

The FA2 interface defines request/response parameters as follow :

```
type balanceOfRequest = {
    owner: tokenOwner,
    token_id: tokenId,
};

type balanceOfResponse = {
    request: balanceOfRequest,
    balance: tokenBalance,
};

type balanceOfCallback = contract(list(balanceOfResponse));

type balanceOfParameter = {
    requests: list(balanceOfRequest),
    callback: balanceOfCallback,
};

type balanceOfRequestMichelson = michelson_pair_right_comb(balanceOfRequest);

type balanceOfResponseAuxiliary = {
    request: balanceOfRequestMichelson,
    balance: tokenBalance
};

type balanceOfResponseMichelson = michelson_pair_right_comb(balanceOfResponseAuxiliary);

type balanceOfCallbackMichelson = contract(list(balanceOfResponseMichelson));

type balanceOfParameterAuxiliary = {
    requests: list(balanceOfRequestMichelson),
    callback: balanceOfCallbackMichelson
};

type balanceOfParameterMichelson = michelson_pair_right_comb(balanceOfParameterAuxiliary);
```



### Transfer

Most basic feature of a token is to provide a way to exchange tokens between owners. The FA2 standard speficies an entry point _Transfer_ for this.

```
| Transfer of transfer list
```

FA2 token contracts MUST implement the _Transfer_ entry point which transfer tokens between owners and MUST ensure following rules.

#### Rules

FA2 token contracts MUST implement the transfer logic defined by the following rules : 


1) Every transfer operation MUST be atomic. If the operation fails, all token transfers MUST be reverted, and token balances MUST remain unchanged.

2) The amount of a token transfer MUST NOT exceed the existing token owner's balance. If the transfer amount for the particular token type and token owner
exceeds the existing balance, the whole transfer operation MUST fail with the error mnemonic "INSUFFICIENT_BALANCE"

3) Core transfer behavior MAY be extended. If additional constraints on tokens transfer are required, FA2 token contract implementation MAY invoke additional
permission policies (transfer hook is the recommended design pattern to implement core behavior extension). (See Chapter FA2 - Hook)

If the additional permission hook fails, the whole transfer operation MUST fail with a custom error mnemonic.

4) Core transfer behavior MUST update token balances exactly as the operation parameters specify it. No changes to amount values or additional transfers are allowed.



#### Interface

It transfer tokens from a *from_* account to possibly many destination accounts where each destination transfer describes the type of token, the amount of token, and receiver address.

```
type tokenId = nat;

/**
 * Types used within the contract for development purposes
 */
type transferContents = {
    to_: tokenOwner,
    token_id: tokenId,
    amount: tokenAmount
};

type transfer = {
    from_: tokenOwner,
    txs: list(transferContents)
};

/**
 * Concrete parameter type definitions with
 * their Michelson representations.
 */
type transferContentsMichelson = michelson_pair_right_comb(transferContents);

type transferAuxiliary = {
    from_: tokenOwner,
    txs: list(transferContentsMichelson)
};

type transferMichelson = michelson_pair_right_comb(transferAuxiliary);

type transferParameter = list(transferMichelson);
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

<!-- prettier-ignore -->"TOKEN_UNDEFINED" - One of the specified *token\_ids* is not defined within the FA2 contract

"INSUFFICIENT_BALANCE" - A token owner does not have sufficient balance to transfer tokens from owner's account

<!-- prettier-ignore -->"TX_DENIED" - A transfer failed because of *operator\_transfer\_policy* == *No\_transfer*

<!-- prettier-ignore -->"NOT_OWNER" - A transfer failed because *operator\_transfer\_policy* == *Owner\_transfer* and it is initiated not by the token owner

<!-- prettier-ignore -->"NOT_OPERATOR" - A transfer failed because *operator\_transfer\_policy* == *Owner\_or\_operator\_transfer* and it is initiated neither by the token owner nor a permitted operator

"RECEIVER_HOOK_FAILED" - The receiver hook failed. This error MUST be raised by the hook implementation

"SENDER_HOOK_FAILED" - The sender failed. This error MUST be raised by the hook implementation

"RECEIVER_HOOK_UNDEFINED" -Receiver hook is required by the permission behavior, but is not implemented by a receiver contract

"SENDER_HOOK_UNDEFINED" - Sender hook is required by the permission behavior, but is not implemented by a sender contract



## Your mission

<!-- prettier-ignore -->We are working on a fungible token compliant with the FA2 standard. We want you to complete the existing implementation of token. The *Balance\_Of* entry point is not yet implemented , please finish the job !

<!-- prettier-ignore -->The function *balanceOfRequestsIterator* is responsible for processing each request and providing a response to each request.As you can see, a request is of type *balanceOfRequestMichelson*


<!-- prettier-ignore -->1- First, we need to retieve information from the request. convert the request *balanceOfRequestMichelson* into a vairiable named *balanceOfRequest* of type _balanceOfRequest_. You can use the *convert\_from\_right\_comb* function (seen in Chapter Interop)

<!-- prettier-ignore -->2- Now that request is readable, call the *getTokenBalance* function in order to retrieve the balance of the specified owner. Store the result in a variable *tokenBalance* of type _tokenBalance_. 

<!-- prettier-ignore -->3- Now, we need to build a response for the balanceOfRequest. Declare a variable *balanceOfResponseAuxiliary* ot type _balanceOfResponseAuxiliary_ which contains the request and the retrieved balance *tokenBalance* (defined in the previous line).

<!-- prettier-ignore -->4- Convert this response of type _balanceOfResponseAuxiliary_ into a variable *balanceOfResponseMichelson* of type _balanceOfResponseMichelson_. You can use the *convert\_from\_right\_comb* function (seen in Chapter Interop)





## WIP

### Metadata

The metadata section deals with token definition which specifies the name, and asset caracteristics such as the range od ids (for non-fungible tokens) or total supply of assets (for fungible tokens). 

<!-- prettier-ignore -->FA2 token contracts MUST implement the *token\_metadata* entry point which get the metadata for multiple token types.

<!-- prettier-ignore -->It accepts a list of *token\_ids* and a callback contract, and sends back a list of *token\_metadata* records.

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

### Totalsupply

FA2 token contracts MUST implement the _Totalsupply_ entry point which get the total supply of tokens for multiple token types  (because FA2 supports mutiple token).
```
| Total_supply of total_supply_param
```

<!-- prettier-ignore -->It accepts a list of *token\_ids* and a callback, and sends back to the callback contract a list of *total\_supply\_response* records.

<!-- prettier-ignore -->If one of the specified *token\_ids* is not defined within the FA2 contract, the entry point MUST fail with the error mnemonic "TOKEN_UNDEFINED" (see section Error Handling).

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