ligo run dry-run starmap.jsligo \
// Type your solution below
'DeduceCategoryChange()' \
'{
  name: "Sol",
  func: (p: planet) : planet_type => PLANET(),
  celestialbodies: Map.literal(list([
    ["earth", {
      position: {x: 2, y: 7, z: 1},
      mass: 1000 as nat,
      category: PLANET() }],
    ["pluto", {
      position: {x: 200, y: 750, z: 100},
      mass: 10 as nat,
      category: PLANET() }],
    ["sun", {
      position: {x: 0, y: 0, z: 0},
      mass: 1000000 as nat,
      category: PLANET() }]
  ]))
}'

