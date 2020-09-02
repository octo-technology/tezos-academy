# Chapter 27 : Preprocessor

<dialog character="mechanics">Now that you are producing a lot of code it could be relevant to split the code and work with many files including each other.</dialog>

Instead of writing the LIGO code in a single file, it is possible to split the code into different files and include some external code into our file. The pre-processor is responsible for handling code inclusion. While working with multiple files we may encounter a problem of cyclic inclusion. To prevent such situation some pre-processor commands are available.

* #if
* #define
* #include

⚠️ Notice that all pre-processor command names start with a _#_.


## Include

Pre-processor command *#include* permits code inclusion. It allows to merge some code into your file. Command *#include* requires a path to a ligo file. 

```
#include "tzip-12/fa2_interface.religo"
```

## Define

Pre-processor command *#define* allows to introduce tags. 

```
#define FA2_NFT_TOKEN
```

Such tags can be used with a conditionnal command. 


## Conditionnal

Pre-processor commands *#if*, *#else* and *#endif* allow to consider / ignore some part of the file depending on tags. Tags are defined with the *#define* command.

```
#if !FA2_NFT_TOKEN

#define FA2_NFT_TOKEN

#include "tzip-12/fa2_interface.religo"

function substr_special (const s: string) : string is
    String.sub (0n, 4n, s)

#else

#include "test/fa2_int.religo"

function substr_special (const s: string) : string is
    String.sub (0n, 3n, s)

#endif
```

⚠️ Notice that the conditionnal *#if* can be used to customize your includes.

⚠️ Notice that this pattern prevents variable or type redefinition in case of cyclic inclusion.

```
#if !X 
#define X
```


## Your mission

We are implementing a smart contract with a modular approach.

As you can see in our exercise, when the WITH_EXTRA tag is defined then the code in extra.mligo file is included.
The module *extra* defines the tag EXTRA and implements a function *doSomethingExtra*.

We want you to make the code responsive to the tag EXTRA.
 

<!-- prettier-ignore -->1- Modify the function *doSomethingInventory* in the *inventory* contract so as to execute *doSomethingExtra* on the given parameter if the EXTRA tag is defined. Otherwise execute *removeFirst* on the given parameter.

