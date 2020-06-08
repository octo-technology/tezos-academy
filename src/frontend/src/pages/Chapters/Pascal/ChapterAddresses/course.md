# Chapter 15 : Addresses

<dialog character="mechanics">The scan showed some unusual activity on the planet Osiris, it's likely we will find Xenomorph activity there. We should gear up first. I suggest we stop by a weapon merchant. Here is the address.</dialog>

## Casting

You can cast a type into another type if you are sure they are compatible :

```
const a : int = int (1n)
const b : nat = abs (-3)
```

⚠️ You will not see a transpilation error if the types are not compatible but the execution will fail.

## Addresses

You can define Tezos addresses by casting a string to an address type :

```
const my_account : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address)
```

⚠️ You will not see a transpilation error if the address you enter is wrong but the execution will fail.

## Your mission

<!-- prettier-ignore -->1- Define *ship\_address* as _tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV_

<!-- prettier-ignore -->2- Define *vendor\_address* as _tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx_
