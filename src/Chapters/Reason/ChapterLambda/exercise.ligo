ligo dry-run lambda2.religo main \
// Type your solution below
'DeduceCategoryChange()' \
'{
    name:"Sol",
    func:((p : planet) : planet_type => PLANET),
    celestialbodies:Map.literal([
        ("earth", {
            position:{x:2,y:7,z:1},
            mass:1000n,
            category:PLANET}), 
        ("pluto", {
            position:{x:200,y:750,z:100},
            mass:10n,
            category:PLANET}), 
        ("sun", {
            position:{x:0,y:0,z:0},
            mass:1000000n,
            category:PLANET})
    ])
}'
