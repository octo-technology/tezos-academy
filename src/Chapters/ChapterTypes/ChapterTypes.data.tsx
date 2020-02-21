export const data = `#Chapter 2 : Types

IGO is strongly and statically typed. This means that the compiler checks how your contract processes data. If it passes the test, your contract will not fail at run-time due to inconsistent assumptions on your data. This is called type checking.

## Built-in types
LIGO comes with all basic types built-in like <i>string</i>, <i>uint</i> or <i>tez</i> for account balance or monetary transactions. You can find all built-in types on <a href="https://gitlab.com/ligolang/ligo/blob/dev/src/passes/operators/operators.ml#L35" target="_blank">the LIGO gitlab</a>.


## Type aliases
Type aliasing consists in renaming a given type, when the context calls for a more precise name. This increases readability and maintainability of your smart contracts. For example we can choose to alias a string type as an animal breed - this will allow us to comunicate our intent with added clarity.

<code height="50px" value="type breed is string
const dog_breed : breed =  'Saluki'">

## Your mission
There is an online editor in the top right corner of this page. In the editor, define <i>ship_code</i> as a string type.
Then define the constant <i>my_ship</i> as a <i>ship_code</i> of value <i>'020433'</i>.
Then go ahead and validate your mission for a comparative view with the solution.
`;
