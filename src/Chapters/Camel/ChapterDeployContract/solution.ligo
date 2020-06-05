ligo compile-storage starmap3.mligo main '{name="Sol";systemplanets=Map.literal [("earth", {x=2;y=7;z=1})]}'

ligo dry-run starmap3.mligo main 'AddPlanet (("mars", {x=4;y=15;z=2}))' '{name="Sol";systemplanets=Map.literal [("earth", {x=2;y=7;z=1})]}'