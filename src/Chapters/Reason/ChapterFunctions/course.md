# Chapter 6 : Functions

<dialog character="mechanics">Captain, why are you trying to change the part yourself? Just write a function on the terminal and send it to a droid.</dialog>

LIGO functions are the basic building block of contracts. Each entrypoint of a contract is a function and each smart contract must have at least one function named _main_ that dispatches the control flow to other functions.

When calling a function, LIGO makes a copy of the arguments but also the environment variables. Therefore any modification to these will not be reflected outside the scope of the function and will be lost if not explicitly returned by the function.

There are 2 types of functions in ReasonLIGO, Block Functions and Blockless Functions :

## Declaring Functions

Functions in ReasonLIGO are defined using the let keyword, like other values. The difference is that a tuple of parameters is provided after the value name, with its type, then followed by the return type.

Functions in ReasonLIGO are defined using the following syntax :

```
let <name> = (<parameters>) : <return_type> =>
{
    <operations and instructions>
};
```

As in CameLIGO and with blockless functions in PascaLIGO, the function body is a single expression, whose value is returned.

```
let add = ((a, b): (int, int)) : int => a + b;
```


If the body contains more than a single expression, you use block between braces:

```
let myFun = ((x, y) : (int, int)) : int => {
  let doubleX = x + x;
  let doubleY = y + y;
  doubleX + doubleY
};
```

## Anonymous functions (a.k.a. lambdas)

It is possible to define functions without assigning them a name. They are useful when you want to pass them as arguments, or assign them to a key in a record or a map.

```
let increment = (b : int) : int => ((a : int) : int => a + 1) (b);
let a : int = increment (1); // a == 2
```

If the example above seems contrived, here is a more common design pattern for lambdas: to be used as parameters to functions. Consider the use case of having a list of integers and mapping the increment function to all its elements.

```
let incr_map = (l : list (int)) : list (int) =>
  List.map ((i : int) => i + 1, l);
```

## Nested function

It's possible to place functions inside other functions. These functions have access to variables in the same scope.

```
let closure_example = (i : int) : int => {
  let closure = (j: int): int => i + j;
  closure(i);
};
```


## Recursive function

LIGO functions are not recursive by default, the user need to indicate that the function is recursive.

At the moment, recursive function are limited to one (possibly tupled) parameter and recursion is limited to tail recursion (i.e the recursive call should be the last expression of the function)
In ReasonLigo recursive functions are defined using the `rec` keyword

```
let rec sum = ((n, acc) : (int,int)): int =>
    if (n < 1) {acc;} else {sum ((n-1,acc+n));};

let rec fibo = ((n, n_1, n_0) : (int,int,int)): int =>
    if (n < 2) {n_1;} else {fibo ((n-1,n_1+n_0,n_1));};
```

## Your mission

<!-- prettier-ignore -->1- Write an block function *modify\_ship* taking as argument *my\_ship* of type *ship\_code* and returning a varible of type *ship\_code* as well.

<!-- prettier-ignore -->2- In the block, copy/cut the code from the previous chapter that modified the third attribute from 0 to 1 and assign the result to a constant *modified\_ship*

<!-- prettier-ignore -->3- Return *modified\_ship*
