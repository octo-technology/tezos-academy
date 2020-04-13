import * as React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Hamburger } from "../Hamburger/Hamburger.controller";
// prettier-ignore
import { HeaderBg, HeaderLogo, HeaderStyled } from "./Header.style";

export const HeaderView = () => {
  const { pathname } = useLocation();

  return (
    <HeaderStyled>
      <HeaderBg>
        <img alt="bg" className="menu-top-left" src="/elements/menu-top.png" />
        <img alt="bg" className="menu-left" src="/elements/menu-left.png" />
        <img alt="bg" className="menu-bottom" src="/elements/menu-bottom.png" />
        <img alt="bg" className="menu-right" src="/elements/menu-right.png" />
        <img alt="bg" className="menu-top-right" src="/elements/menu-top.png" />
      </HeaderBg>

      <Hamburger />
      <Link to="/">
        <HeaderLogo alt="logo" src="/elements/logo.svg" />
      </Link>
      <Link to="/50" className="user">
        <img src="/elements/user.svg" alt="user" />
      </Link>
    </HeaderStyled>
  );
};
