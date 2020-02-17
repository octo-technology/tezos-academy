import * as React from "react";

import {
  HeaderStyled,
  HeaderMenu,
  HeaderSubMenu,
  HeaderLogo,
  HeaderMenuItem,
  HeaderMenuSelector
} from "./Header.style";

export const HeaderView = () => (
  <HeaderStyled>
    <HeaderMenu>
      <HeaderLogo alt="logo" src="/elements/logo.svg" />
      <HeaderMenuItem to="/1" className="selected">
        I - SHIP FACTORY
      </HeaderMenuItem>
      <HeaderMenuItem to="/11">II - INTO BATTLE</HeaderMenuItem>
      <HeaderMenuItem to="/21">III - COMMING SOON</HeaderMenuItem>
      <HeaderMenuSelector />
    </HeaderMenu>
    <HeaderSubMenu></HeaderSubMenu>
  </HeaderStyled>
);
