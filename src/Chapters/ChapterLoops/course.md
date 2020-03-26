# Chapter 8 : Loops

LIGO integrate 2 kinds of loops. General while iterations and bounded for loops.

## While loops

While loops are define as follows :

```
while <condition> block {
    <operations>
}
```

⚠️ If the while condition is never met, the block will will repeatedly be evaluated until the contract run out of gas or fails.

## For Loops

For-loops iterates over bounded intervals :

```
for <variable assignment> to <upper bound> block {
    <operations>
}
```

For instance :

```
var acc : int := 0;
for i := 1 to 10 block {
    acc := acc + i
}
```

For-loops can also iterate through the contents of a collection, that is, a list, a set or a map. This is done with :

```
for <element var> in <collection type> <collection var> block {
    <operations>
}
```

Here is an example where the integers in a list are summed up.

```
function sum_list (var l : list (int)) : int is block {
  var total : int := 0;
  for i in list l block {
    total := total + i
  }
} with total
```

## Your mission

Modify the contract so that the function iterates over all attributes of the ship and changes all occurences of "2" by "1".
