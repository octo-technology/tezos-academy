# Chapter 14 : Loops

<dialog character="pilot">Captain, now that we left the atmosphere of earth, we should scan nearby star systems for alien activity. We know that the Xenomorphs like planets with high density, usually above 100 g/cm³ and that their machines trigger atmospheric activity. You should trigger a scan with these parameters.</dialog>

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

## Iterations

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

Same from sets with _for i in set s_ and maps with _for key -> value in map m_

## Your mission

<!-- prettier-ignore -->1- Check the proposed code in the editor. Notice that we created a star map as a list of planet records.

<!-- prettier-ignore -->2- Notice the unimplemented scan function. Suppose this function is called from the main function with the *star\_map* variable as its input _l_. Code a for loop that iterates through each record of the list.

<!-- prettier-ignore -->3- Inside the loop, code a conditional for *density* supperior to 100 and *atmospheric\_activity* true. If so, assign *destination* to its *name*.
