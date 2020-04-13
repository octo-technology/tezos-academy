import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideDrawer, showDrawer } from "../Drawer/Drawer.actions";
import { HamburgerView } from "./Hamburger.view";

export const Hamburger = () => {
  const dispatch = useDispatch();
  const activated = useSelector((state: any) => (state && state.drawer ? state.drawer.showing : false));

  const activateCallback = () => {
    dispatch(activated ? hideDrawer() : showDrawer());
  };

  return <HamburgerView activated={activated} activateCallback={activateCallback} />;
};
