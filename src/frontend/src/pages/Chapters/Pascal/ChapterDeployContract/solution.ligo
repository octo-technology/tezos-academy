ligo compile-storage starmap3.ligo main 'record [name="Sol"; systemplanets=map [ "earth" -> record [x=2;y=7;z=1] ] ]'

ligo dry-run starmap3.ligo main 'AddPlanet (("mars", record[x=4;y=15;z=2]))' 'record [name="Sol"; systemplanets=map [ "earth" -> record [x=2;y=7;z=1] ] ]'