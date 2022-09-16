# Chapter 23 : Deploy contract

<dialog character="admiral">Time to deploy into the battlefield Rookie!</dialog>

## Smart contract

A smart contract is some code written in Michelson language (a low-level stack-based turing-complete language).

It defines all _entry points_ (invocable functions) of the smart contract.
It defines the prototype of each entry point (e.g. specifies the parameters types of the entry point).
It defines the _storage_ of the smart contract.

### Storage

The storage is an allocated memory space associated to a smart contract. The storage is a persistent data store for the smart contract.

The description of the storage is done by strongly-typing the data structure.

### Entry points

Entry points of a smart contract describe how to mutate a storage.

Executing an entry point takes some parameters and a state of a storage and returns a new state of storage and some operations

![](/images/contract_in_out.png)

The execution of an entry point produces a new state of the storage of the smart contract. If the entry point execution did not throw an exception and did not fail then the new state of storage is applied.

Operations are transactions (smart contract invocation) that will be sent to some other contracts. They will trigger an entry point of the targeted contract or a tez transfer (no invocation of entry point). If the execution of an entry point produces operations (an ordered list of transactions) then they are sent and executed following the order of the list of operations.

## Deploy

A smart contract must be deployed on the blockchain in order to be invoked. When deploying a smart contract on the blockchain, one must specify the initial state of the storage.

Deployment of a smart contract in Tezos is called "origination".

Here is the syntax of the tezos command line to deploy a smart contract :

```
tezos-client originate contract <contract_name> for <user> transferring <amount_tez> from <from_user> \
             running <tz_file> \
             --init '<initial_storage>' --burn-cap <gaz_fee>
```

<contract_name> name given to the contract
<tz_file> path of the Michelson smart contract code (TZ file).
<amount_tez> is the quantity of tez being transferred to the newly deployed contract. If a contract balance reaches 0 then it is deactivated.
<from_user> account from which the tez are taken from (and transferred to the new contract).
<initial_storage> is a Michelson expression. The --init parameter is used to specify initial state of the storage.
<gaz_fee> it specifies the the maximal fee the user is willing to pay for this operation (using the --burn-cap parameter).

## Invoke

Once the smart contract has been deployed on the blockchain (contract-origination operation baked into a block), it is possible to invoke an entry point of the smart contract using the command line.

Here is the syntax of the tezos command line to invoke a smart contract :

```
tezos-client transfer <amount_tez> from <user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run
```

<amount_tez> is the quantity of tez being transferred to the contract.
<contract_name> name given to the contract
<entrypoint_invocation> is a Michelson expression specifying the entry point and its corresponding parameters. For example, in Ligo the invocation call 'Increment(5)' would be translated into following Michelson expression 'Left (Right 5)'.

⚠️ Notice that the --arg parameter specifies an entry point call.

⚠️ Notice that the --dry-run parameter simulate the invocation of the entry point.

## Ligo compiler

In order to produce a smart contract, a tool called transpiler (aka LIGO compiler) is used to transform LIGO code into Michelson code.
Michelson smart contract are stored in a file with .tz extension.

This LIGO compiler is also used to transform "LIGO expression" into "Michelson expression" as needed to deploy or invoke a smart contract.

### Compile

Here is how to transform LIGO code into Michelson code using the LIGO compiler in command line.

```
ligo compile contract code.ligo -e mainFunc > code.tz
```

⚠️ The <mainFunc> argument is the name of the "main function" in the .jsligo file and is introduced with the *-e* option. (see Chapter "Main Function").

⚠️ Notice that the output of the command is the Michelson code. We just redirect the command output into a .tz file.

### Initial storage

Here is how to transform LIGO expression into Michelson expression using the LIGO compiler in command line.

```
ligo compile storage code.ligo '<ligo_expression>' [options]
```

<ligo_expression> is a LIGO expression representing the storage of the smart contract

### Invocation parameter

Here is how to transform LIGO expression into Michelson expression using the LIGO compiler in command line.

```
ligo compile parameter code.ligo mainFunc '<ligo_expression>' [options]
```

<ligo_expression> is a LIGO expression representing the called entrypoint of the smart contract. If the smart contrat has only the default entrypoint the value is *unit*, otherwise it expects the name of the entrypoint and its arguments.

### Simulating

Here is how to simulate the execution of an entry point using the LIGO compiler in command line.

```
ligo run dry-run code.ligo mainFunc '<entrypoint(p)>' '<storage_state>' [options]
ligo run dry-run starmap.jsligo 'AddPlanet(["earth", [1,2,3]])' 'Map.empty as map<string, coordinates>' [options]
```

<storage\_state> state of the storage when simulating the execution of the entry point
<entrypoint(p)> entry point of the smart contract that is invoked (parameter \_p* of this entry point is specified between parentheses).

### Ligo Expression in command line

Let's see some example how to transpile a storage LIGO expression into a Michelson one.

Let's consider this smart contract which associates coordinates to a planet name.

```
// starmap.jsligo
type coordinates = [int, int, int];
type storage = map<string, coordinates>;
type return_ = [list<operation>, storage];
type parameter =
| ["AddPlanet", [string, coordinates]]
| ["DoNothing"];

const addPlanet = (input: [string, coordinates], store: storage) : return_ => {
	const modified: storage = match(Map.find_opt(input[0], store), {
		Some: (_c: coordinates) => failwith("planet already exists"),
		None: () => Map.add(input[0], input[1], store)
	});
	return [list([]) as list<operation>, modified];
};

const main = (action: parameter, store: storage): return_ => match(action, {
	AddPlanet: (input: parameter) => addPlanet(input, store),
	DoNothing: () => [list([]) as list<operation>, store]
});
```

#### Maps

Initialization of elements of a map is specified between _Map.literap(list([_ and _]))_ and elements separated by comma _,_. Each element is a key/value pair separated by comma _,_ and follow the syntax :

```
Map.literal(list([ [<key1>, <value1>], [<key2>, <value2>] ]));
```

Here is an example of a command line _ligo compile-storage_ for transpiling a map containing a tuple.

```
ligo compile storage starmap.jsligo 'Map.literal(list([ ["earth", [1,1,1]] ]))'
```

When specifying an empty map, one must cast the _Map.empty_ into the expected type.

```
ligo compile-storage starmap.ligo main 'Map.empty as map<string,coordinates>'
```

#### Tuples

Initialization of elements of a tuple is specified between _[_ and _]_ separated by comma _,_.

Here is an example of a command line _ligo compile storage_ for transpiling a map containing a tuple.

```
ligo compile storage starmap.jsligo 'Map.literal(list([ ["earth", [1,1,1]] ]))'
```

This command returns :

```
{ Elt "earth" (Pair (Pair 1 1) 1) }
```

#### Record

Initialization of elements of a record is specified between _{_ and _}_ separated by commas _,_. Each element is a key/value pair separated by _:_ and follow the syntax :

```
{ <key1>: <value1>, <key2>: <value2> }
```

Let's modify our type _coordinates_ to be a record instead of a tuple.

```
// starmap2.mligo
type coordinates = {
  x: int,
  y: int,
  z: int
}
...

const main = (action: parameter, store: storage): return_ => match(action, {
	AddPlanet: (input: parameter) => addPlanet(input, store),
	DoNothing: () => [list([]) as list<operation>, store]
});
```

Here is an example of a command line _ligo compile storage_ for transpiling a map containing a tuple.

```
ligo compile storage starmap2.jsligo 'Map.literal(list([ ["earth", {x: 1, y: 1, z: 1}] ]))'
```

This command returns :

```
{ Elt "earth" (Pair (Pair 1 1) 1) }
```

⚠️ Notice that the record is transformed into pairs (same for tuples).

## Your mission

We want to prepare the initial state of our star system database before deploying the following smart contract. Just to be sure everything works as expected it would be nice to simulate our entry point _AddPlanet_.

```

//starmap3.jsligo
type coordinates = { x: int, y: int, z: int };
type planets = map<string, coordinates>;
type storage = { 
    name: string,
    systemplanet: planets
};
type return_ = [list<operation>, storage];

type parameter = 
| ["AddPlanet", [string, coordinates]]
| ["DoNothing"];

const addPlanet = (input: [string, coordinates], store: storage) : return_ => {
	const modified: planets = match(Map.find_opt(input[0], store.systemplanet), {
		Some: (_c: coordinates) => failwith("planet already exists"), 
		None: () => Map.add(input[0], input[1], store.systemplanet)
	});
	return [list([]) as list<operation>, { name: store.name, systemplanet: modified }];
};

const main = (action: parameter, store: storage): return_ => match(action, {
	AddPlanet: (input: parameter) => addPlanet(input, store),
	DoNothing: () => [list([]) as list<operation>, store]
});
```

<!-- prettier-ignore -->1- Write the _compile storage_ command and the LIGO expression for initializing the *Sol* system containing planet "earth" with coordinates [2,7,1].

<!-- prettier-ignore -->2- Write the _dry-run_ command and the LIGO expression for adding a planet "mars" with coordinates [4,15,2] in our *Sol* system.
<!-- prettier-ignore -->⚠️ Remind that the _dry-run_ command expects a parameter "<entrypoint\<p\>>" and a parameter "<storage\_state>" as shown in Simulating section. For this _dry-run_ command you must write the "<entrypoint\<p\>>" parameter and reuse the *Sol* system of step 1 as "<storage\_state>" parameter.
