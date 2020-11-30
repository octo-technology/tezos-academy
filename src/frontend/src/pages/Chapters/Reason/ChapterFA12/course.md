# Chapter 27 : Fungible token with Financial Asset 1.2 standard

<dialog character="mechanics">Captain, we received the bill for reparing the ship after the last battle: 1,000,000 TAT. I have no idea what TAT is or its convertion rate to Tez, that's likely an alien currency, you should probably find out!</dialog>

## Definition

A Financial Asset represents a non-physical asset whose value is derived from a contractual claim, such as bank deposits, bonds, or stocks. Financial assets are usually more liquid than other tangible assets, such as commodities or real estate, and may be traded on financial markets.

Financial assets are opposed to non-financial assets, such as property rights which include both tangible properties (sometimes also called real assets) such as land, real estate or commodities and intangible assets such as intellectual property like copyrights, patents, Trademarks, etc.

## Fungible and non-fungible tokens

A _token_ or _crypto-currency_ is a numerical asset emitted on a blockchain.

Fungible means divisible. A Fungible token is a Financial Asset where the account balance represents the value associated to an _address_. This value can be splitted into smaller parts which can be transferred to another account.

A Non-fungible token (NFT) is a Financial Asset whose balance cannot be splitted into smaller parts. Crypto-kitties is an example of a game using non fungible tokens (on the Ethereum blockchain). For example, a video game avatar (such as avatar on world of warcraft) is a character having some skills/attributes (strength, dexterity,...) and one may want to sell his avatar, but cannot sell the strength property of his avatar separately. It makes sense to keep the whole avatar into a undivisible set of attributes.

## Standard

A standard is a set of rules commonly accepted by the community.
The rules of Financial Asset describe how to create currencies (and transfer those between accounts, etc).

Depending on the usage of the currency, many sets of rules have been commonly accepted :

- Financial Asset 1.2 (FA1.2) is a set of rules for fungible tokens.
- Financial Asset 2.0 (FA20) is a set of rules for fungible and non fungible tokens.

For example, the creation of a crypto-currency is equivalent to creating a contract which supports the FA1.2 standard.
All smart contracts supporting the FA1.2 standard can interact with accounts and other contracts by transfering coins of our crypto-currency.

Similarily for Ethereum, fungible token rules have been specified on an Ethereum forum blog (Ethereum Request Comment), the 20th answer was describing a good rule set and the ERC20 became the name for this standard (rule set).
ERC721 is the standard rule set for non-fungible tokens.

## FA1.2 (Implementation of standard)

This Fungible token standard provides basic functionality to transfer tokens, as well as allowing tokens to be approved so they can be spent by another on-chain third party.

Possible actions :
_Approve_ - Sender can specify an amount of token that can be spent by someone else (from his account)
_Transfer_ - Transfer an amount of tokens from an account to another account (or third-party on-chain smart contract)
_GetAllowance_ - Return the amount that can be spent by someone from sender's account
_GetBalance_ - Return the sender's account balance
_GetTotalSupply_ - Returns the number total of token

Let's see an implementation in ReasonLigo of a fungible token (FA1.2)

```
type tokens = big_map (address, nat)
type allowances = big_map ((address, address), nat) /* (sender,account) -> value */

type storage = {
  tokens      : tokens,
  allowances  : allowances,
  total_amount : nat,
}

type transfer = {
	address_from : address,
	address_to   : address,
	value        : nat,
}

type approve = {
	spender : address,
	value   : nat,
}

type getAllowance = {
	owner    : address,
	spender  : address,
	callback : contract (nat),
}

type getBalance = {
	owner    : address,
	callback : contract (nat),
}

type getTotalSupply = {
	callback : contract (nat),
}

type action =
|	Transfer       ( transfer )
|	Approve        ( approve )
|	GetAllowance   ( getAllowance )
|	GetBalance     ( getBalance )
|	GetTotalSupply ( getTotalSupply )

let transfer = ((p,s) : (transfer, storage)) : (list (operation), storage) => {
   let new_allowances =
		if (Tezos.sender == p.address_from) { s.allowances; }
		else {
			let authorized_value = switch (Big_map.find_opt ((Tezos.sender,p.address_from), s.allowances)) {
			|	Some value => value
			|	None       => 0n
			};
			if (authorized_value < p.value) { (failwith ("Not Enough Allowance") : allowances); }
			else { Big_map.update ((Tezos.sender,p.address_from), (Some (abs(authorized_value - p.value))), s.allowances); };
		};
	let sender_balance = switch (Big_map.find_opt (p.address_from, s.tokens)) {
	|	Some value => value
	|	None       => 0n
	};
	if (sender_balance < p.value) { (failwith ("Not Enough Balance") : (list (operation), storage)); }
	else {
		let new_tokens = Big_map.update (p.address_from, (Some (abs(sender_balance - p.value))), s.tokens);
		let receiver_balance = switch (Big_map.find_opt (p.address_to, s.tokens)) {
		|	Some value => value
		|	None       => 0n
		};
		let new_tokens = Big_map.update (p.address_to, (Some (receiver_balance + p.value)), new_tokens);
		(([]: list (operation)), { ...s,tokens:new_tokens, allowances:new_allowances});
	};
};

let approve = ((p,s) : (approve, storage)) : (list (operation), storage) => {
	let previous_value = switch (Big_map.find_opt ((p.spender, Tezos.sender), s.allowances)){
	|	Some value => value
	|	None => 0n
	};
	if (previous_value > 0n && p.value > 0n)
	{ (failwith ("Unsafe Allowance Change") : (list (operation), storage)); }
	else {
		let new_allowances = Big_map.update ((p.spender, Tezos.sender), (Some (p.value)), s.allowances);
		(([] : list (operation)), { ...s, allowances : new_allowances});
	};
};

let getAllowance = ((p,s) : (getAllowance, storage)) : (list (operation), storage) => {
	let value = switch (Big_map.find_opt ((p.owner, p.spender), s.allowances)) {
	|	Some value => value
	|	None => 0n
	};
	let op = Tezos.transaction (value, 0mutez, p.callback);
	([op],s)
};

let getBalance = ((p,s) : (getBalance, storage)) : (list (operation), storage) => {
	let value = switch (Big_map.find_opt (p.owner, s.tokens)) {
	|	Some value => value
	|	None => 0n
	};
	let op = Tezos.transaction (value, 0mutez, p.callback);
	([op],s)
};

let getTotalSupply = ((p,s) : (getTotalSupply, storage)) : (list (operation), storage) => {
  let total = s.total_amount;
  let op    = Tezos.transaction (total, 0mutez, p.callback);
  ([op],s)
};


let main = ((a,s): (action, storage)) =>
 	switch a {
   |	Transfer p => transfer ((p,s))
	|	Approve  p => approve ((p,s))
	|	GetAllowance p => getAllowance ((p,s))
	|  GetBalance p => getBalance ((p,s))
	|	GetTotalSupply p => getTotalSupply ((p,s))
	};

```

## Your mission

Let's assume _TezosAcamedyToken_ has been deployed.

Consider your account is _me_ (at address tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ).
Consider alice's account (at address tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7).

<!-- prettier-ignore -->1- We want you to simulate the transfer of 2 TAT (Tezos Academy Token) to *alice*. Complete the ligo command line for preparing a storage state where you (tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ) possess 1,000,000 tokens and no allowance. Write the storage state (all values of the storage must be filled).

<!-- prettier-ignore -->2- Write a ligo command line for preparing the invocation of an *Approval* of 2 TAT (Tezos Academy Token) for *alice*.

<!-- prettier-ignore -->3- Write a ligo command line that simulates your invocation of previous *Approval* on storage prepared at step 1. (Don't forget to specify that you are sending this transaction).

<!-- prettier-ignore -->4- Now that the ligo compiler ensured us that the simulation is good, we will try to simulate it with the tezos-client command line in order to know the right amount of gas needed to execute *approval*. You can consider that step 2 produced the following Michelson expression:

```
(Left (Left (Left (Pair "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" 2))))
```

<!-- prettier-ignore -->5- Write a Tezos command line that simulates your invocation.

<!-- prettier-ignore -->6- Now that the approval has been executed on the blockchain, 2 TAT can be transferred from your address to *alice*'s. Write a ligo command line for preparing the invocation of a *Transfer* of 2 TAT (Tezos Academy Token) from you to *alice*.

<!-- prettier-ignore -->7- Write a ligo command line for preparing a simulated storage where you (tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ) possess 1,000,000 tokens and an allowance is initialized with 2 TAT that can be transferred from *me* to *alice* (tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7).

<!-- prettier-ignore -->8- Write a ligo command line that simulates your invocation of the previous *Transfer* on storage prepared at step 7. (Don't forget to specify that you are sending this transaction).

<!-- prettier-ignore -->9- Now that the ligo compiler ensured us that the simulation is good, we will try to simulate it with the tezos-client command line in order to know the right amount of gas needed to run execute *transfer*. You can consider that step 6 produces the following Michelson expression:

```
(Right (Pair (Pair "tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7") 2))
```

<!-- prettier-ignore -->10- Write a Tezos command line that simulates your *Transfer* invocation.

<!-- prettier-ignore -->Remind the syntax of the tezos-client transfer command:

```
tezos-client transfer <tx_amount> from <tx_user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run
```

<!-- prettier-ignore --><tx\_amount> = number of mutez of the transaction
<!-- prettier-ignore --><tx\_user> = account who is emitting the transaction
<!-- prettier-ignore --><contract_name> = name of the contract
<!-- prettier-ignore --><entrypoint_invocation> = michelson expression representing the entrypoint and its related parameters
