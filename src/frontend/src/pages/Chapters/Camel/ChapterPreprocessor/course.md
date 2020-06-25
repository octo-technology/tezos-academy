# Chapter 20 : Preprocessor

<dialog character="mechanics"></dialog>

Instead of writing the whole code in a single file, it is possible to split code into different files and include some external code into our file. The preprocessor is responsible to handle code inclusion. While working with multiple files we may encounter a problem of cyclic inclusion. To prevent such situation some pre-processor commands are available.

* #if
* #define
* #include

⚠️ Notice all pre-processor command names start with a _#_.

## Include

Preprocessor command *#include* permits code inclusion. It allows to merge some code into your file. Command *#include* requires a path to a ligo file. 

```
#include "tzip-12/fa2_interface.mligo"
```

## Define

Preprocessor command *#define* allows to introduce tags. 

```
#define FA2_NFT_TOKEN
```

Such tags can be used with a conditionnal command. 


## Conditionnal

Preprocessor commands *#if* and *#endif* allows to consider / ignore some part of the file depending on tags. Tags are defined with the *#define* command.

```
#if !FA2_NFT_TOKEN

#define FA2_NFT_TOKEN
#include "tzip-12/fa2_interface.mligo"

let substr_special (s: string) : string = 
  String.sub 0n 4n s

#else
#include "test/fa2_int.mligo"

let substr_special (s: string) : string = 
  String.sub 0n 3n s

#endif
```

⚠️ Notice that this pattern prevents from redefinition in case of cyclic inclusion.

```
#if !X 
#define X
```


## Your mission

Our service is modular. we provide to client only desired module and not the extra modules . They have to pay for it !
The main module *inventory* can be customized. If we define WITH_EXTRA tag then the code in extra.mligo will be included.
The module *extra* defines the tag EXTRA and implements a function doSomethingExtra 

We want you to make the code responsive to the tag EXTRA
 

<!-- prettier-ignore -->1- Modify the function *doSomethingInventory* in the inventory contract *inventory* so as to execute *doSomethingExtra* on given parameter if the EXTRA tag is defined. Otherwise apply *removeFirst* to the given parameter.

