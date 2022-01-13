# Chapter 27 : Preprocessor

<dialog character="mechanics">Our ship is made of modules, you can easily attach or remove external modules, check it out.</dialog>

Instead of writing the LIGO code in a single file, it is possible to split the code into different files or include some external code into our file. The pre-processor is responsible for handling code inclusion. While working with multiple files we may encounter a problem of cyclic inclusion. To prevent such situation some pre-processor commands are available.

- #if
- #define
- #include

⚠️ Notice that all pre-processor command names start with a _#_.

## Include

Pre-processor command _#include_ permits code inclusion. It allows to merge some code into your file. Command _#include_ requires a path to a ligo file.

```
#include "tzip-12/fa2_interface.jsligo"
```

## Define

Pre-processor command _#define_ allows to introduce tags.

```
#define FA2_NFT_TOKEN
```

Such tags can be used with a conditionnal command.

## Conditionnal

Pre-processor commands _#if_, _#else_ and _#endif_ allow to consider / ignore some part of the file depending on tags. Tags are defined with the _#define_ command.

```
#if !FA2_NFT_TOKEN

#define FA2_NFT_TOKEN

#include "tzip-12/fa2_interface.jsligo"

const substr_special = (s: string) : string => 
    String.sub (0 as nat, 4 as nat, s);

#else

#include "test/fa2_int.jsligo"

const substr_special = (s: string) : string =>
    String.sub (0 as nat, 3 as nat, s);

#endif
```

⚠️ Notice that the conditionnal _#if_ can be used to customize your includes.

⚠️ Notice that this pattern prevents variable or type redefinition in case of cyclic inclusion.

```
#if !X
#define X
```

## Your mission

We are implementing a smart contract with a modular approach.

As you can see in our exercise, when the WITH*EXTRA tag is defined then the code in extra.jsligo file is included.
The module \_extra* defines the tag EXTRA and implements a function _doSomethingExtra_.

We want you to make the code responsive to the tag EXTRA.

<!-- prettier-ignore -->1- Modify the function *doSomethingInventory* in the *inventory* contract so as to execute *doSomethingExtra* on the given parameter if the EXTRA tag is defined. Otherwise execute *removeFirst* on the given parameter.
