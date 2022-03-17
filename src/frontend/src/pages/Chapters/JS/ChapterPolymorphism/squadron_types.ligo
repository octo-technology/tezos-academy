type actionRegisterModule = {
  name: string,
  moduleAddress: address
};

type actionModuleRequest = {
  moduleName: string,
  key: string,
  callbackAddress: address
};

type actionModuleResponse = {
  e: ship
};

type modules = map<string, address>;

type actionSquadron =
| ["RegisterModule", actionRegisterModule]
| ["ModuleRequest", actionModuleRequest]
| ["ModuleResponse", actionModuleResponse];
