import * as React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FooterStyled, FooterCredits } from "./Footer.style";

export const FooterView = () => {
  const { pathname } = useLocation();
  let page = parseInt(pathname.replace("/", ""));
  if (!page) page = 1;
  const previousPage = page > 1 ? page - 1 : 1;
  const nextPage = page < 20 ? page + 1 : "coming-next";

  return (
    <FooterStyled>
      <Link to={`/${previousPage}`}>
        <img alt="Previous Chapter" src="/elements/previous-chapter.svg" />
      </Link>
      <Link to={`/${nextPage}`}>
        <img alt="Next Chapter" src="/elements/next-chapter.svg" />
      </Link>
      <FooterCredits>
        MADE WITH ♡ BY{" "}
        <a href="https://www.linkedin.com/in/aymeric-bethencourt-96665046/" target="_blank" rel="noopener noreferrer">
          AYMERIC BETHENCOURT
        </a>{" "}
        AND{" "}
        <a href="https://octo.com/" target="_blank" rel="noopener noreferrer">
          OCTO TECHNOLOGY
        </a>
      </FooterCredits>
    </FooterStyled>
  );
};
