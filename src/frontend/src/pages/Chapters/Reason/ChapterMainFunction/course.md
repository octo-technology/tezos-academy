# Chapter 13 : Main function

<dialog character="admiral">God damn it rookie! What are you still doing at the space port? Take off already and go shoot some alien!!</dialog>

Smart contracts are small programs that are stored and executed on the blockchain. They allow people to cooperate and exchange tokens without requiring them to trust one another.

A LIGO contract is made of a series of constant and function declarations. Only functions having a special type can be called when the contract is activated: we call them main functions. A main function takes two parameters, the contract parameter and the on-chain storage, and returns a pair made of a list of operations and a (new) storage.

When the contract is originated, the initial value of the storage is provided. When a main function is later called, only the parameter is provided, but the type of a main function contains both.

The type of the contract parameter and the storage are up to the contract designer, but the type for list operations is not. The return type of a main function is as follows, assuming that the type storage has been defined elsewhere. (Note that you can use any type with any name for the storage.)

```
type storage = ...;  // Any name, any type
type return = (list (operation), storage);
```

The contract storage can only be modified by activating a main function: given the state of the storage on-chain, a main function specifies how to create another state for it, depending on the contract's parameter.

Here is an example where the storage is a single natural number that is updated by the parameter.

```
type parameter = nat;
type storage = nat;
type return = (list (operation), storage);

let main = ((action, store): (parameter, storage)) : return =>
  (([] : list (operation)), store);
```

## Entrypoints

In LIGO, the design pattern is to have one main function called main, that dispatches the control flow according to its parameter. Those functions called for those actions are called entrypoints.

As an analogy, in the C programming language, the main function is the unique main function and any function called from it would be an entrypoint.

The parameter of the contract is then a variant type, and, depending on the constructors of that type, different functions in the contract are called. In other terms, the unique main function dispatches the control flow depending on a pattern matching on the contract parameter.

In the following example, the storage contains a *counter* of type _nat_ and a *name* of type _string_. Depending on the parameter of the contract, either the *counter* or the *name* is updated.

```
type parameter =
| Action_A (nat)
| Action_B (string);

type storage = {
  counter : nat,
  name    : string
};

type return = (list (operation), storage);

let entry_A = ((n, store): (nat, storage)) : return =>
  (([] : list (operation)), {...store, counter : n});

let entry_B = ((s, store): (string, storage)) : return =>
  (([] : list (operation)), {...store, name : s});

let main = ((action, store): (parameter, storage)) : return =>
  switch (action) {
  | Action_A (n) => entry_A ((n, store))
  | Action_B (s) => entry_B ((s, store))
  };
```

ℹ️ Now that you created a main function, you can now transpile your code into Michaelson and deploy it on Tezos. Try it out on the <a href="https://ide.ligolang.org/" target="_blank">LIGOlang IDE</a>

## Your mission

<!-- prettier-ignore -->1- The editor contains an example of main function with two functions. In the parameter variant, replace *Action\_A* and *Action\_B* with our actions *Set\_ship\_code* and *Go\_to*

<!-- prettier-ignore -->2- In the storage record, replace *stored\_string\_A* and *stored\_string\_B* with the strings we want to store in the contract: *ship\_code* and *destination*

<!-- prettier-ignore -->3- Modify the name of our entrypoints *entry\_A* and *entry\_B* to *set\_ship\_code* and *go\_to*

<!-- prettier-ignore -->4- Modify the main function to reflect the new names above
