import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { hideDrawer } from "./Drawer.actions";
import { DrawerView } from "./Drawer.view";

export const Drawer = () => {
  const dispatch = useDispatch();
  const showing = useSelector((state: any) => state.drawer && state.drawer.showing);
  const user = useSelector((state: any) => state && state.auth && state.auth.user);
  const { pathname } = useLocation();

  const hideCallback = () => {
    dispatch(hideDrawer());
  };

  function removeAuthUserCallback() {}

  return (
    <DrawerView
      showing={showing}
      hideCallback={hideCallback}
      pathname={pathname}
      user={user}
      removeAuthUserCallback={removeAuthUserCallback}
    />
  );
};
