export const text1 = `
Starting with the absolute basics:

Solidity's code is encapsulated in contracts. A contract is the fundamental building block of Ethereum applications — all variables and functions belong to a contract, and this will be the starting point of all your projects.

An empty contract named HelloWorld would look like this:
`;

export const code1 = `contract HelloWorld {

}
`;

export const code2 = `begin
  try
    { TODO -oUser -cConsole Main : Insert code here }
    greetingsMessage := 'Hello World!';
    numberOfTimes := 10;
`;

export const text2 = `
All solidity source code should start with a "version pragma" — a declaration of the version of the Solidity compiler this code should use. This is to prevent issues with future compiler versions potentially introducing changes that would break your code.

For the scope of this tutorial, we'll want to be able to compile our smart contracts with any compiler version in the range of 0.5.0 (inclusive) to 0.6.0 (exclusive). It looks like this: pragma solidity >=0.5.0 <0.6.0;.

Putting it together, here is a bare-bones starting contract — the first thing you'll write every time you start a new project:
`;
