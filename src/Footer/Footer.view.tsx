import * as React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FooterStyled } from "./Footer.style";

export const FooterView = () => {
  const { pathname } = useLocation();
  const page = parseInt(pathname.replace("/", ""));
  const previousPage = page > 1 ? page - 1 : 1;
  const nextPage = page < 20 ? page + 1 : 20;

  return (
    <FooterStyled>
      <Link to={`/${previousPage}`}>
        <img alt="Previous Chapter" src="/elements/previous-chapter.svg" />
      </Link>
      <Link to={`/${nextPage}`}>
        <img alt="Next Chapter" src="/elements/next-chapter.svg" />
      </Link>
    </FooterStyled>
  );
};
