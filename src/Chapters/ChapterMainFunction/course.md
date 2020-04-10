# Chapter 17 : Main function

A LIGO contract is made of a series of constant and function declarations. Only functions having a special type can be called when the contract is activated: we call them main functions. A main function takes two parameters, the _contract parameter_ and the _on-chain storage_, and returns _a pair made of a list of operations and a (new) storage_.

When the contract is originated, the initial value of the storage is provided. When a main function is later called, only the parameter is provided, but the type of a main function contains both.

The type of the contract parameter and the storage are up to the contract designer, but the type for list operations is not. The return type of a main function is as follows, assuming that the type _storage_ has been defined elsewhere. (Note that you can use any type with any name for the storage.)

The contract storage can only be modified by activating a main function: given the state of the storage on-chain, a main function specifies how to create another state for it, depending on the contract's parameter.


## Syntax

The Main function of a smart contract follows syntax definition of regular function but must have a specific prototype.

1- The Main function must contain exactly 2 parameters (one is the contract parameter, and the other is the storage)

2- The Main function return a tuple (list(operation) * <storage>) where <storage> is the storage type definition

```
function <main_function_name> (const <parameter_name>:<parameter_type>; const <storage_name>:<storage_type>) : (list(operation) * <storage_type>) is 
block { <functionBody> }
with (<list_operation_value>, <new_storage_value>)
```

Note that most of the time the main fonction return an empty list of operations and the new state of the storage

## Exemple

Here is an example where the storage is a single natural number that is updated by the parameter.

```
type parameter is nat
type storage is nat
type return is list (operation) * storage

function save (const action : parameter; const store : storage) : return is
  ((nil : list (operation)), store)
```


# Your mission


<!-- prettier-ignore -->
1- Define the _on-line storage_ type named *storage* which stores a single string

2- Create a Main function called *main* which takes a first parameter named *p* of type string and storage state as second parameter named *store*

3- The body of the Main function must do nothing 

4- The return of the Main function will assign the value of *p* as the new storage state
