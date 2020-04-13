import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import { drawerReducers as drawer } from "./Drawer/Drawer.reducers";

export const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    drawer,
  });
