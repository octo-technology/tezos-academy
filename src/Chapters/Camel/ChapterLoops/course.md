# Chapter 14 : Loops

<dialog character="pilot">Captain, now that we left the atmosphere of earth, we should scan nearby star systems for alien activity. We know that the Xenomorphs like planets with high density, usually above 100 g/cm³ and that their machines trigger atmospheric activity. You should trigger a scan with these parameters.</dialog>


## General iteration

CameLIGO is a functional language where user-defined values are constant, therefore it makes no sense in CameLIGO to feature loops, which we understand as syntactic constructs where the state of a stopping condition is mutated, as with "while" loops in PascaLIGO.

Instead, CameLIGO loops are written by means of a tail recursive function

Here is how to compute the greatest common divisors of two natural numbers by means of Euclid's algorithm:
While loops are define as follows :

```
let rec iter (x,y : nat * nat) : nat =
  if y = 0n then x else iter (y, x mod y)

let gcd (x,y : nat * nat) : nat =
  let x,y = if x < y then y,x else x,y in
  iter (x,y)
```

## Your mission

<!-- prettier-ignore -->1- Check the proposed code in the editor. Notice that we created a star map as a list of planet records.

<!-- prettier-ignore -->2- Notice the unimplemented scan function. Suppose this function is called from the main function with the *star\_map* variable as its input _l_. Code a for loop that iterates through each record of the list.

<!-- prettier-ignore -->3- Inside the loop, code a conditional for *density* supperior to 100 and *atmospheric\_activity* true. If so, assign the planet to *destination*.
