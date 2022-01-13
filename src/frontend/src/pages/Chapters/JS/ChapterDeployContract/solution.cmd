ligo compile storage starmap3.jsligo '{ name: "Sol", systemplanet: Map.literal(list([ ["earth", {x:2,y:7,z:1} ] ]))}'

ligo run dry-run starmap3.jsligo 'AddPlanet(["mars", {x:4,y:15,z:2}])' '{ name: "Sol", systemplanet: Map.literal(list([ ["earth", {x:2,y:7,z:1} ] ]))}'
