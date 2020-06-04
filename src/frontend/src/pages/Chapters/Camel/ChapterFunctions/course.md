# Chapter 6 : Functions

<dialog character="mechanics">Captain, why are you trying to change the part yourself? Just write a function on the terminal and send it to a droid.</dialog>

LIGO functions are the basic building block of contracts. Each entrypoint of a contract is a function and each smart contract must have at least one function named _main_ that dispatches the control flow to other functions.

When calling a function, LIGO makes a copy of the arguments but also the environment variables. Therefore any modification to these will not be reflected outside the scope of the function and will be lost if not explicitly returned by the function.


## Defining Functions

Functions in CameLIGO are defined using the _let_ keyword, like other values. The difference is that a succession of parameters is provided after the value name, followed by the return type.

This follows OCaml syntax.
```
let add (a : int) (b : int) : int = a + b
```

CameLIGO is a little different from other syntaxes when it comes to function parameters. In OCaml, functions can only take one parameter. To get functions with multiple arguments like we are used to in imperative programming languages, a technique called currying is used. Currying essentially translates a function with multiple arguments into a series of single argument functions, each returning a new function accepting the next argument until every parameter is filled. This is useful because it means that CameLIGO supports partial application.

Currying is however not the preferred way to pass function arguments in CameLIGO. While this approach is faithful to the original OCaml, it is costlier in Michelson than naive function execution accepting multiple arguments. Instead, for most functions with more than one parameter, we should gather the arguments in a tuple and pass the tuple in as a single parameter.

```
let add (a, b : int * int) : int = a + b             // Uncurried
let add_curry (a : int) (b : int) : int = add (a, b) // Curried
let increment : int -> int = add_curry 1             // Partial application
```

From now on , we mainly use the "uncurried" syntax for function definition.

```
let add (a, b : int * int) : int = a + b
```


## Anonymous functions (a.k.a. lambdas)

It is possible to define functions without assigning them a name. They are useful when you want to pass them as arguments, or assign them to a key in a record or a map.

```
let increment (b : int) : int = (fun (a : int) -> a + 1) b
let a : int = increment 1 // a = 2
```

If the example above seems contrived, here is a more common design pattern for lambdas: to be used as parameters to functions. Consider the use case of having a list of integers and mapping the increment function to all its elements.

```
let incr_map (l : int list) : int list =
  List.map (fun (i : int) -> i + 1) l
```

## Nested function

It's possible to place functions inside other functions. These functions have access to variables in the same scope.

```
let closure_example (i : int) : int =
  let closure : int -> int = fun (j : int) -> i + j in
  closure i
```

## Recursive function

LIGO functions are not recursive by default, the user need to indicate that the function is recursive.

At the moment, recursive function are limited to one (possibly tupled) parameter and recursion is limited to tail recursion (i.e the recursive call should be the last expression of the function)

In CameLigo recursive functions are defined using the _rec_ keyword

```
let rec sum ((n,acc):int * int) : int =
    if (n < 1) then acc else sum (n-1, acc+n)
 
let rec fibo ((n,n_1,n_0):int*int*int) : int = 
    if (n < 2) then n_1 else fibo (n-1, n_1 + n_0, n_1)
```

## Your mission

<!-- prettier-ignore -->1- Write a function *modify\_ship* taking as argument *my\_ship* of type *ship\_code* and returning a varible of type *ship\_code* as well.

<!-- prettier-ignore -->2- The function must compute and return a modified *ship\_code* where the third character of my\_ship is changed from 0 to 1. You can copy/paste the code from the previous chapter that modified the third attribute from 0 to 1.

