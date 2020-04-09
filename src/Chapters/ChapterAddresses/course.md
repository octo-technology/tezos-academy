# Chapter 12 : Addresses

## Addresses

You can define Tezos addresses by casting a string to an address type :

```
const my_account : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address)
```

⚠️ You will not see a transpilation error if the address you enter is wrong but the execution will fail.

## Signatures

You can also cast strings as Tezos signatures (edsig, spsig) :

```
const my_sig : signature = ("edsigthTzJ8X7MPmNeEwybRAvdxS1pupqcM5Mk4uCuyZAe7uEk68YpuGDeViW8wSXMrCi5CwoNgqs8V2w8ayB5dMJzrYCHhD8C7" : signature)
```

## Keys

Same principle for Tezos public keys :

```
const my_key : key = ("edpkuBknW28nW72KG6RoHtYW7p12T6GKc7nAbwYX5m8Wd9sDVC9yav" : key)
```

## Your mission

<!-- prettier-ignore -->
1- Modify the mapping *owner\_of* so that the owner is no longer a string but an address.

2- Make the Galactica belong to address "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"

3- Make the Galactica belong to address "tz1YfuHeaaPyKFGAjrCskb8kzEEkmaMhiDhd"
