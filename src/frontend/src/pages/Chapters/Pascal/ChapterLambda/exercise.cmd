docker run --rm -v "$PWD":"$PWD" -w "$PWD" ligolang/ligo:next run dry-run starmap.ligo -e main \
// Type your solution below
'DeduceCategoryChange()' \
'record[
  name="Sol";
  func=(function (const p : planet) : planet_type is PLANET);
  celestialbodies=map [
    "earth" -> record [
      position=record [x=2;y=7;z=1];
      mass=1000n;
      category=PLANET]; 
    "pluto" -> record [
      position=record [x=200;y=750;z=100];
      mass=10n;
      category=PLANET]; 
    "sun" -> record [
      position=record [x=0;y=0;z=0];
      mass=1000000n;
      category=PLANET] 
  ]
]'