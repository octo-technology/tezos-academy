ligo compile-storage starmap3.religo main '{name:"Sol",system_planets:Map.literal ([("earth", {x:2,y:7,z:1})])}'

ligo dry-run starmap3.religo main 'AddPlanet (("mars", {x:4,y:15,z:2}))' '{name:"Sol",system_planets:Map.literal ([("earth", {x:2,y:7,z:1})])}'