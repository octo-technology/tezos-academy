# Chapter 17 : Transactions

<dialog character="pilot">Hey captain, we've been hanging with that vendor a long time now. Can we finally pay him and go to Osiris?</dialog>

You can transfer tez to an account, or to a function of another smart contract. For this, use :

```
Tezos.transaction (<parameter>, <mutez>, <address>);
```

where :

- _parameter_ is the entrypoints of another contract, or use _unit_ if you are transfering to a wallet address,
- _mutez_ is the amount to transfer,
- _address_ is the address of the other contract or the wallet.

## Your mission

<!-- prettier-ignore --> 1- Transfer the *purchase\_price* to the *vendor\_address*
