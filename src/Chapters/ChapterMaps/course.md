# Chapter 10 : Maps

Maps associates values of the same type with other values of the same type.

## Declaration

Maps are declared as

```
type balances is map (address, int)
```

## Instanciation

To create an non-empty map, do as follows :

```
const user_balances : balances =
    map [
        ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address) -> (5n);
        ("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address) -> (0n)
    ]
```

ℹ️ Let the array emprty to declared an empty map.
