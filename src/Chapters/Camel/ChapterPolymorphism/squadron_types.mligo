type actionRegisterModule = {  
    name : string;
    moduleAddress : address
}

type actionModuleRequest = {  
    moduleName : string;
    key : string;
    callbackAddress: address
}

type actionModuleResponse = { 
    e : ship
}

type modules = (string, address) map

type actionSquadron =
| RegisterModule of actionRegisterModule
| ModuleRequest of actionModuleRequest
| ModuleResponse of actionModuleResponse
