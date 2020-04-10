type actionRegisterModule is record [
  name : string;
  moduleAddress : address;
]

type actionModuleRequest is record [
  moduleName : string;
  key : string;
  callbackAddress: address;
]

type actionModuleResponse is record [
  e : ship;
]

type modules is map(string, address)

type actionSquadron is
| RegisterModule of actionRegisterModule
| ModuleRequest of actionModuleRequest
| ModuleResponse of actionModuleResponse
