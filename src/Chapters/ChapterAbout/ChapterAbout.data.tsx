export const data = `#Chapter 1 : About Tezos Academy

Tezos Academy is a fun interactive tutorial develloped by <a href="https://octo.com/" target="_blank">OCTO Technology</a> on how to code smart contracts for <a href="https://tezos.com/" target="_blank">Tezos</a>. You are about to create a spaceship battle smart contract!

By default, Tezos smart contracts are written in <a href="https://tezos.gitlab.io/whitedoc/michelson.html" target="_blank">Michaelson</a>, but it is an hard to learn low level formal language. That is why we decide for this tutorial to use <a href="https://ligolang.org/" target="_blank">Pascaligo</a> instead. The syntax is high level, close to Pascal and tranpiles to Michaelson.

## Part I : The ship factory

In part I of this tutorial, you are going to build a "Ship Factory" to build an army of spaceships.

* Our factory will maintain a database of all ships in our army
* Our factory will have a function for creating new ships
* Each ship will have a random and unique appearance

We will add more and more functionalities as you progress through this tutorial, such as going into space battles! But first, let's start with the basics and create new ships.

## How Ship ID works

Ship's appearance is based on its unique ID, a 8 digits integer such as
<code height="20px" value="101301">

Ship ID is similar to how DNA works. Parts of it correspond to parts of its appearance. The first digit corresponds to the class of the ship, the second to the cabin design, third to the engine design, etc...

For our tutorial, we only designed a few parts for each attribute, 3 different cabins, 5 different engines, etc... but for a real application we could imagine hundreds of different parts, making it almost impossible to randomly select two identical ships. The most famous game like this is <a href="https://www.cryptokitties.co/" target="_blank">Crypto Kitties</a>.

## Your mission

On the top-right panel, go ahead and move the slider of each attribute. Notice the Ship ID above the ship image and how the different numerical values correspond to the different ship appearance. Your mission is to select the ship with ID 020433 and validate it.

Next, we will start coding some PascaLIGO!
`;
