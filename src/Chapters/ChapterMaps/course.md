# Chapter 10 : Maps

Maps associates values of the same type with other values of the same type.

## Declaration

Maps are declared as

```
type balances is map (address, int)
```

## Instanciation

To create an non-empty map :

```
const user_balances : balances =
    map [
        ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address) -> (5n);
        ("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address) -> (0n)
    ]
```

ℹ️ If you want to declare an empty map, just leave the array empty [].

## Access

Use the postfix [] operator to read a value of the map :

```
const my_balance : option (int) =
  user_balances [("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address)]
```

## Update

The values of a map can be updated using the usual assignment syntax :

```
user_balances [("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN": address)] := (2n)
```

## Removal

A key-value can be removed from the mapping as follows :

```
  remove "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" from map user_balances
```

## Big Maps

<!-- prettier-ignore -->
Maps load their entries into the environement, which is fine for small maps, but for maps holding millions of entries, the cost of loading such map would be too expensive. For this we use *big\_maps*. Their syntax is the same as for regular maps.

## Your mission

You received a laserbeam message from Interstellar Gov: "Your registration request (for your ship) will be processed as fast as possible. You will recieve a message when it is done (probably in 4 to 6 weeks)."
... I'm wondering why registration takes so long ...  I heard you are a blockchainer ! go help them ... pleeeease

1- Create the mapping type _owner_ which associates a ship name to their owner name.

<!-- prettier-ignore -->
2-Create the mapping *owner\_of* of type _owner_ for the ship "Battlestar" owned by "Adama"
