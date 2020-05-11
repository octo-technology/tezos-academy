export const data = `#Chapter 1 : Tezos Academy

<dialog character="admiral">Hello rookie! I'm admiral Adama. I hope you are ready for a fight. The Xenomorphs have been attacking our colonies for days now. We are throwing everything we’ve got at them, that means even you rookie, so you better learn and fast! You have been assigned to ship 020433, go ahead and board your ship.</dialog>

Tezos Academy is a fun interactive tutorial develloped by <a href="https://octo.com/" target="_blank">OCTO Technology</a> on how to code smart contracts for <a href="https://tezos.com/" target="_blank">Tezos</a>. You are about to create spaceship battles smart contracts!

By default, Tezos smart contracts are written in <a href="https://tezos.gitlab.io/whitedoc/michelson.html" target="_blank">Michelson</a>, but it is an hard to learn low level formal language. For this tutorial, we will use <a href="https://ligolang.org/" target="_blank">PascaLIGO</a> instead. The syntax is high level, close to Pascal and transpiles to Michelson.

## Objectives

In this tutorial, we will go over each fundamental principles of LIGO while coding the following features :

* Our own ship
* A ship factory
* Our army of ships
* Battle simulation

The ship factory will maintain a database of all ships in our army and have a function for creating new ships. Each ship will have a random and unique appearance. For this, we will use _Non-Fungible Tokens_ (i.e. tokens that are unique) with a dedicated ship ID.

## How Ship ID works

Ship's appearance is based on its unique ID, a 6 digits integer such as
<code height="20px" value="101301">

Ship ID is similar to how DNA works. Parts of it correspond to parts of its appearance. The first digit corresponds to the class of the ship, the second to the cabin design, third to the engine design, etc...

For our tutorial, we only designed a few parts for each attribute, 3 different cabins, 5 different engines, etc... but for a real application we could imagine hundreds of different parts, making it almost impossible to randomly select two identical ships. The most famous game like this is <a href="https://www.cryptokitties.co/" target="_blank">Crypto Kitties</a>.

## Your mission

On the top-right panel, go ahead and move the slider of each attribute. Notice the Ship ID above the ship image and how the different numerical values correspond to the different ship appearance. Your mission is to select the ship with ID 020433 and click _Validate Mission_ below.

Next, we will start coding some LIGO!
`;
