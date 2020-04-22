# Chapter 6 : Functions

<dialog character="mechanics">Captain, why are you trying to change the part yourself? Just write a function on the terminal and send it to a droid.</dialog>

LIGO functions are the basic building block of contracts. Each entrypoint of a contract is a function and each smart contract must have at least one function named _main_ that dispatches controls to the other functions.

When calling a function, LIGO makes a copy of the arguments but also the environment variables. Therefore any modification to these will not be reflected outside the scope of the function and will be lost if not explicitly returned by the function.

There are 2 types of functions in PascaLIGO, Block Functions and Blockless Functions :

## Block Functions

In PascaLIGO, blocks allows for the sequential composition of instructions into an isolated scope. Each block needs to include at least one instruction.

```
block { a := a + 1 }
```

If we need a placeholder, we use the instruction _skip_ which leaves the state unchanged. The rationale for skip instead of a truly empty block is that it prevents you from writing an empty block by mistake.

```
block { skip }
```

Blocks can also include declarations of values :

```
block { const a : int = 1 }
```

Functions in PascaLIGO are defined using the following syntax :

```
function <name> (<parameters>) : <return_type> is
block {
    <operations and instructions>
  } with <returned_value>
```

For instance :

```
function add (const a : int; const b : int) : int is
  block {
    const sum : int = a + b
  } with sum
```

## Blockless functions

Functions that can contain all of their logic into a single expression can be defined without the need of a block. The add function above can be re-written as a blockless function:

```
function add (const a: int; const b : int) : int is a + b
```

## Anonymous functions (a.k.a. lambdas)

It is possible to define functions without assigning them a name. They are useful when you want to pass them as arguments, or assign them to a key in a record or a map.

```
function increment (const b : int) : int is
   (function (const a : int) : int is a + 1) (b)
const a : int = increment (1); // a = 2
```

If the example above seems contrived, here is a more common design pattern for lambdas: to be used as parameters to functions. Consider the use case of having a list of integers and mapping the increment function to all its elements.

```
function incr_map (const l : list (int)) : list (int) is
  List.map (function (const i : int) : int is i + 1, l)
```

## Recursive function

LIGO functions are not recursive by default, the user need to indicate that the function is recursive.

At the moment, recursive function are limited to one (possibly tupled) parameter and recursion is limited to tail recursion (i.e the recursive call should be the last expression of the function)

In PascaLigo recursive functions are defined using the _recursive_ keyword

```
recursive function sum (const n : int; const acc: int) : int is
  if n<1 then acc else sum(n-1,acc+n)
```

## Your mission

<!-- prettier-ignore -->1- Write an block function *modify\_ship* taking as argument *my\_ship* of type *ship\_code* and returning a varible of type *ship\_code* as well.

<!-- prettier-ignore -->2- In the block, copy/cut the code from the previous chapter that modified the third attribute from 2 to 1 and assign the result to a constant *modified\_ship*

<!-- prettier-ignore -->3- Return *modified\_ship*
