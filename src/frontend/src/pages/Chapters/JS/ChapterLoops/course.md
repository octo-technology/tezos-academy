# Chapter 14 : Loops

<dialog character="pilot">Captain, now that we left the atmosphere of earth, we should scan nearby star systems for alien activity. We know that the Xenomorphs like planets with high density, usually above 100 g/cm³ and that their machines trigger atmospheric activity. You should trigger a scan with these parameters.</dialog>

LIGO integrates 2 kinds of loops. General while iterations and bounded for loops.

## While loops

While loops are defined as follows :

```
while (<condition>) {
    <operations>
}
```

⚠️ If the while condition is never met, the block will repeatedly be evaluated until the contract run out of gas or fails.

ℹ️ About gas : The smart contracts interpreter uses the concept of gas. Each low-level instruction evaluation burns an amount of gas which is crafted to be proportional to the actual execution time and if an execution exceeds its allowed gas consumption, it is stopped immediately and the effects of the execution are rolled back. The transaction is still included in the block and the fees are taken, to prevent the nodes from being spammed with failing transactions. In Tezos, the economic protocol sets the gas limit per block and for each transaction, and the emitter of the transaction also set an upper bound to the gas consumption for its transaction. The economic protocol does not require the transaction fee to be proportional to the gas upper bound, however the default strategy of the baking software (that forges blocks) provided with Tezos current implementation does require it.

## For Loops

For-loops iterates over bounded intervals :

```
for (<variable assign> of <upper bound>) {
    <operations>
}
```

For instance :

```
let acc : int = 0;
for (const i of 10) {
    acc = acc + i;
}
```

## Iterations

For-loops can also iterate through the contents of a collection, that is, a list, a set or a map.

Here is an example where the integers in a list are summed up.

```
let sum_list = (l: list<int>): int => {
    let total : int = 0;
    for (const i of l) {
        total = total + i
    }
    return total
}
```

## Your mission

<!-- prettier-ignore -->1- Check the proposed code in the editor. Notice that we created a star map as a list of planet records.

<!-- prettier-ignore -->2- Notice the unimplemented scan function. Suppose this function is called from the main function onto the *star\_map* variable. Code a *for* loop that iterates through each record of the list _l_ (given as parameter of the _scan_ function). Use *i* as iterator name.

<!-- prettier-ignore -->3- Inside the loop, code a conditional for *density* superior to 100 and *atmospheric\_activity* true. If so, assign the planet to *destination* otherwise do nothing.
