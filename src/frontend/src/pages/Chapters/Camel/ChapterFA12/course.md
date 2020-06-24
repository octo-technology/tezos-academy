# Chapter 23 : Fungible Asset 1.2

<dialog character="mechanics">Captain, why are you trying to change the part yourself? Just write a function on the terminal and send it to a droid.</dialog>

## Definition

A financial asset is a non-physical asset whose value is derived from a contractual claim, such as bank deposits, bonds, and stocks. Financial assets are usually more liquid than other tangible assets, such as commodities or real estate, and may be traded on financial markets.

Financial assets are opposed to non-financial assets, property rights which include both tangible property (sometimes also called real assets) such as land, real estate or commodities and intangible assets such as intellectual property, like copyrights, patents, Trademarks etc. 

### Fungible and non-fungible

When talking about *token* or *crypto-currency*, it is a numerical asset emitted on a blockchain.

Fungible means secable 

Fungible token is a financial asset where account balance represents the value associated to an _address_. This value can be splitted into smaller parts which can be transfered to another account.

Non-fungible token (NFT) is a financial asset whose balance cannot be splitted into smaller part. Crypto-kitties is an exemple of non fungible token (on Ethereum blcockchain). For exemple, a video game avatar (such as avatar on world of warcraft) is a character having some skills/attributes (strength, dexterity, ...) one can want to sell its avatar , but cannot sell strength property of its avatar separately. It makes sense to keep tha whole avatar into a unsecable set of attributes. 

### Standard

A standard is a set of rules commonly accepted by the community. 
The rules of financial asset describes how to create currencies (and transfer between accounts, etc). 

Depending on the usage of the currency, many sets of rules have been commonly accepted :
* Financial asset 1.2 (FA1.2) are rules for fungible token.
* Financia asset 2.0 (FA20) are rules for non fungible token.

For exemple, the creation of a crypto-currency is equivalent to creating a contract which supports the FA1.2 standard.
All smart contracts supporting the FA12 standard can interact with account and other contracts by transfering coins of our crypto-currency.


Similarily for ethereum, fungible token rules have been specified in a Ethereum forum blog (Ethereum Request Comment) the 20th answer was describing  a good rule set and the ERC20 became the name for this standard (rule set).
ERC721 is the standard rule set for non-fungible token.

## FA1.2 (Implementation of standard)

This Fungible token standard provides basic functionality to transfer tokens, as well as allow tokens to be approved so they can be spent by another on-chain third party.

Possible actions :
  Appove - Sender can specify an amount of token that can be spent by someone else (from his account)
  Transfer - Transfer an amount a token from an account to another account (or third-party on-chain smart contract)
  GetAllowance - Return the amount that can be spent by someone from sender's account 
  GetBalance - Returns sender's account balance
  GetTotalSupply - Returns the number total of token


Let's see implementation in ReasonLigo of a fungible token (FA1.2) 

```
type tokens = (address, nat) big_map
type allowances = (address * address, nat) big_map (* (sender,account) -> value *)

type storage = {
  tokens      : tokens;
  allowances  : allowances;
  total_amount : nat;
}

type transfer = {
	address_from : address;
	address_to   : address;
	value        : nat;
}

type approve = {
	spender : address;
	value   : nat;
}

type getAllowance = {
	owner    : address;
	spender  : address;
	callback : nat contract;
}

type getBalance = {
	owner    : address;
	callback : nat contract;
}

type getTotalSupply = {
	callback : nat contract;
}

type action =
  	Transfer       of transfer
|	Approve        of approve
|	GetAllowance   of getAllowance
|	GetBalance     of getBalance
|	GetTotalSupply of getTotalSupply

let transfer (p,s : transfer * storage) : operation list * storage =
   let new_allowances =   
		if Tezos.sender = p.address_from then s.allowances
		else
			let authorized_value = match Big_map.find_opt (Tezos.sender,p.address_from) s.allowances with
				Some value -> value
			|	None       -> 0n
			in
			if (authorized_value < p.value)
			then (failwith "Not Enough Allowance" : allowances)
			else Big_map.update (Tezos.sender,p.address_from) (Some (abs(authorized_value - p.value))) s.allowances
   in    
	let sender_balance = match Big_map.find_opt p.address_from s.tokens with
		Some value -> value
	|	None        -> 0n
	in
	if (sender_balance < p.value)
	then (failwith "Not Enough Balance" : operation list * storage)
	else
		let new_tokens = Big_map.update p.address_from (Some (abs(sender_balance - p.value))) s.tokens in
		let receiver_balance = match Big_map.find_opt p.address_to s.tokens with
			Some value -> value
		|	None        -> 0n
		in
		let new_tokens = Big_map.update p.address_to (Some (receiver_balance + p.value)) new_tokens in
		([]:operation list), {s with tokens = new_tokens; allowances = new_allowances}

let approve (p,s : approve * storage) : operation list * storage =
	let previous_value = match Big_map.find_opt (p.spender, Tezos.sender) s.allowances with
		Some value -> value
	|	None -> 0n
	in
	if previous_value > 0n && p.value > 0n
	then (failwith "Unsafe Allowance Change" : operation list * storage)
	else
		let new_allowances = Big_map.update (p.spender, Tezos.sender) (Some (p.value)) s.allowances in
		([] : operation list), {s with allowances = new_allowances}

let getAllowance (p,s : getAllowance * storage) : operation list * storage =
	let value = match Big_map.find_opt (p.owner, p.spender) s.allowances with
		Some value -> value
	|	None -> 0n
	in
	let op = Tezos.transaction value 0mutez p.callback in
	([op],s)

let getBalance (p,s : getBalance * storage) : operation list * storage =
	let value = match Big_map.find_opt p.owner s.tokens with
		Some value -> value
	|	None -> 0n
	in
	let op = Tezos.transaction value 0mutez p.callback in
	([op],s)

let getTotalSupply (p,s : getTotalSupply * storage) : operation list * storage =
  let total = s.total_amount in
  let op    = Tezos.transaction total 0mutez p.callback in
  ([op],s)


let main (a,s:action * storage) = 
 	match a with
   	Transfer p -> transfer (p,s)
	|	Approve  p -> approve (p,s)
	|	GetAllowance p -> getAllowance (p,s)
	|	GetBalance p -> getBalance (p,s)
	|	GetTotalSupply p -> getTotalSupply (p,s)

```



## Your mission

Let's assume the *TezosAcamedyToken* has been deployed. 

Consider your account is *me* (at address tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ) which has been granted 1000000 token. 
Consider alice account (at address tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7)

<!-- prettier-ignore -->1- We want you to simulate the transfer of 2 TAT (Tezos Academy Token) to *alice*. Write a ligo command line for preparing a simulated storage where you (tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ) possess 1000000 of token and no allowances.

<!-- prettier-ignore -->2- Write a ligo command line for preparing invocation of an *Approval* of 2 TAT (Tezos Academy Token) for *alice*.

<!-- prettier-ignore -->3- Write a ligo command line that simulate your invocation of previous *Approval* on storage prepared at step 1. (Don't forget to specify that you are sending this transaction).

<!-- prettier-ignore -->4- Now that ligo compiler ensured us that simulation is good, we will try to simulate it with the tezos-client command line in order to know the right amount of gas needed to run execute *approval*. You can consider that step 2 produced the following michelson expression:
```
(Left (Left (Left (Pair "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" 2))))
```
<!-- prettier-ignore -->5-Write a tezos command line that simulate your invocation.

<!-- prettier-ignore -->6-  Now that approval has been exeucted on blockchain, 2 TAT can be transfered from your address to *alice*. Write a ligo command line for preparing invocation of a *Transfer* of 2 TAT (Tezos Academy Token) from you to *alice*.


<!-- prettier-ignore -->7- Write a ligo command line for preparing a simulated storage where you (tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ) possess 1000000 of token and allowances is initialized with 2 TAT that can be transfered from *me* to *alice* (tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7).

<!-- prettier-ignore -->8- Write a ligo command line that simulate your invocation of previous *Transfer* on storage prepared at step 7. (Don't forget to specify that you are sending this transaction).

<!-- prettier-ignore -->9- Now that ligo compiler ensured us that simulation is good, we will try to simulate it with the tezos-client command line in order to know the right amount of gas needed to run execute *transfer*. You can consider that step 6 produces the following michelson expression:
```
(Right (Pair (Pair "tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7") 2))
```

<!-- prettier-ignore -->10-Write a tezos command line that simulate your *Transfer* invocation.