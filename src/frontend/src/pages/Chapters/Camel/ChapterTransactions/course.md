# Chapter 17 : Transactions

<dialog character="pilot">Hey captain, we've been hanging with that vendor a long time now. Can we finally pay him and go to Osiris?</dialog>

You can transfer tez to an account, or to a function of another smart contract. For this, use :

```
let op : operation = Tezos.transaction (<parameter>, <mutez>, <contract>);
```

where :

- _parameter_ is the entrypoint of another contract, or use _unit_ if you are transferring to a wallet address,
- _mutez_ is the amount to transfer,
- _contract_ is the contract interface of the targeted contract. It can be retrieved from address of the other contract or the wallet.

⚠️ Notice the _Tezos.transaction_ function returns *op* of type _operation_ .

## Your mission

<!-- prettier-ignore --> 1- Create a transaction that transfers the *purchase\_price* to the *vendor\_contract*. The resulting operation must be used to initialize a constant *op* of type *operation*. In our case we need to transfer directly to a wallet address (not another smart contract).
