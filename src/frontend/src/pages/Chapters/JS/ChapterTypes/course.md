# Chapter 2 : Types

<dialog character="mechanics">Welcome onboard captain, I'm the ship's mechanic. The first thing to do before departing is to define your ship's parameters. Go ahead!</dialog>

LIGO is a strongly and statically typed language. This means that the compiler checks how your contract processes data. If it passes the test, your contract will not fail at run-time due to inconsistent assumptions on your data. This is called type checking.

## Built-in types

LIGO comes with all basic types built-in like _string_, _int_ or _tez_ for account balance or monetary transactions. You can find all built-in types on <a href="https://gitlab.com/ligolang/ligo/blob/dev/src/passes/operators/operators.ml#L35" target="_blank">the LIGO gitlab</a>.

## Type aliases

Type aliasing consists in renaming a given type, when the context calls for a more precise name. This increases readability and maintainability of your smart contracts. For example we can choose to alias a string type as an animal breed - this will allow us to comunicate our intent with added clarity.

```
type breed = string;
let dog_breed: breed = "Saluki";
```

## Simple types

The type account_balances denotes a map from addresses to tez

```
type account_balances = map<address, tez>;

let ledger: account_balances = Map.literal( list([
    ["tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" as address, 10 as mutez]
]));
```

ℹ️We will look more deeply into the _map_ construct in the following chapters.

## Structured types

Often contracts require complex data structures, which in turn require well-typed storage or functions to work with. LIGO offers a simple way to compose simple types into structured types.
The first of those structured types is the record, which aggregates types as fields and index them with a field name. In the example below we define an account type whick keeps the balance and number of previous transactions for a given account.

```
type account = address;
type number_of_transactions = nat;

type account_data = {
  balance: tez,
  transactions: number_of_transactions
};

let my_account : account = {
  balance: 10 as mutez,
  transactions: 5 as nat,
};
```

ℹ️We will look more deeply into the _record_ construct in the following chapters.

## Your mission

<!-- prettier-ignore -->1- There is an online editor in the top right corner of this page. In the editor, define *ship\_code* as a string type.

<!-- prettier-ignore -->2- Then define the constant *my\_ship* as a *ship\_code* of value _"020433"_.

<!-- prettier-ignore -->3- Then go ahead and validate your mission for a comparative view with the solution.
