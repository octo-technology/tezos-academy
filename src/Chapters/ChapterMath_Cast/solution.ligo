type ship_armor is nat
var ship1_armor : ship_armor := 10n;
var ship2_armor : ship_armor := 5n;
var ship3_armor : ship_armor := 0n;
// Type your solution below
const diff_armor : int = ship1_armor - ship2_armor;
var ship3_armor : ship_armor := abs(diff_armor);
