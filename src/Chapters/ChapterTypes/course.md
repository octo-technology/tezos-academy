#Chapter 2 : Types

LIGO is strongly and statically typed. This means that the compiler checks how your contract processes data. If it passes the test, your contract will not fail at run-time due to inconsistent assumptions on your data. This is called type checking.

## Built-in types

LIGO comes with all basic types built-in like <i>string</i>, <i>uint</i> or <i>tez</i> for account balance or monetary transactions. You can find all built-in types on <a href="https://gitlab.com/ligolang/ligo/blob/dev/src/passes/operators/operators.ml#L35" target="_blank">the LIGO gitlab</a>.

## Type aliases

Type aliasing consists in renaming a given type, when the context calls for a more precise name. This increases readability and maintainability of your smart contracts. For example we can choose to alias a string type as an animal breed - this will allow us to comunicate our intent with added clarity.

```js
type breed is string
const dog_breed : breed = "Saluki"
```

## Simple types

The type account_balances denotes maps from addresses to tez

```js
type account_balances is map (address, tez)

const ledger : account_balances =
map [("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address) -> 10mutez]

```

## Structured types

Often contracts require complex data structures, which in turn require well-typed storage or functions to work with. LIGO offers a simple way to compose simple types into structured types.
The first of those structured types is the record, which aggregates types as fields and index them with a field name. In the example below you can see the definition of data types for a ledger that keeps the balance and number of previous transactions for a given account.

```js
// Type aliasing

type account is address
type number_of_transactions is nat

// The type account_data is a record with two fields.

type account_data is record [
  balance : tez;
  transactions : number_of_transactions
]

// A ledger is a map from accounts to account_data

type ledger is map (account, account_data)

const my_ledger : ledger = map [
  ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address) ->
  record [
    balance = 10mutez;
    transactions = 5n
  ]
]
```

## Your mission

1- There is an online editor in the top right corner of this page. In the editor, define <i>ship_code</i> as a string type.

2- Then define the constant <i>my_ship</i> as a <i>ship_code</i> of value <i>'020433'</i>.

3- Then go ahead and validate your mission for a comparative view with the solution.
