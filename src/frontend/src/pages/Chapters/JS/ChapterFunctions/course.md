# Chapter 6 : Functions

<dialog character="mechanics">Captain, why are you trying to change the part yourself? Just write a function on the terminal and send it to a droid.</dialog>

LIGO functions are the basic building block of contracts. Each entrypoint of a contract is a function and each smart contract must have at least one function named _main_ that dispatches the control flow to other functions.

When calling a function, LIGO makes a copy of the arguments but also the environment variables. Therefore any modification to these will not be reflected outside the scope of the function and will be lost if not explicitly returned by the function.

Functions in JsLIGO are defined using the let or const keyword, like other values. The difference is that parameters are provided after the value name, with its type, then followed by the return type.

Here is how you define a basic function that sums two integers:

```
let add = ([a, b]: [int, int]): int => a + b;
```

If the body contains more than a single expression, you use block between braces:

```
let myFun = ([x, y]: [int, int]): int => {
  let doubleX = x + x;
  let doubleY = y + y;
  return doubleX + doubleY;
};
```

Note that JsLIGO, like JavaScript, requires the return keyword to indicate what is being returned. If return is not used, it will be the same as return unit.

<!-- prettier-ignore -->By default, LIGO will warn about unused arguments inside functions. In case we do not use an argument, we can use the wildcard _\__ to prevent warnings. Either use _\__ instead of the argument identifier:

```
let k = ([x, _] : [int, int]) : int => x;
```

or use an identifier starting with wildcard:

```
let k = ([x, _y] : [int, int]) : int => x;
```

## Anonymous functions (a.k.a. lambdas)

It is possible to define functions without assigning them a name. They are useful when you want to pass them as arguments, or assign them to a key in a record or a map.

```
let increment = (b: int): int => ((a: int): int => a + 1) (b);
let a: int = increment(1); // a == 2
```

If the example above seems contrived, here is a more common design pattern for lambdas: to be used as parameters to functions. Consider the use case of having a list of integers and mapping the increment function to all its elements.

```
let incr_map = (l: list<int>): list<int> => List.map((i: int) => i + 1, l);
```

## Nested functions (also known as closures)

It's possible to place functions inside other functions. These functions have access to variables in the same scope.

```
let closure_example = (i: int): int => {
  let closure = (j: int): int => i + j;
  return closure(i);
};
```

## Your mission

<!-- prettier-ignore -->1- Write an block function *modify\_ship* taking as argument *my\_ship* of type *ship\_code* and returning a varible of type *ship\_code* as well.

<!-- prettier-ignore -->2- In the block, copy/cut the code from the previous chapter that modified the third attribute from 0 to 1 and assign the result to a constant *modified\_ship*

<!-- prettier-ignore -->3- Return *modified\_ship*
