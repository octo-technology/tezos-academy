import * as React from "react";
import { HomepageStyled } from "./Homepage.style";
import { Link } from "react-router-dom";
import { Button, ButtonBorder, ButtonText } from "../Chapters/Pascal/ChapterAbout/ChapterAbout.style";

type HomepageViewProps = {};

export const HomepageView = () => {
  return (
    <HomepageStyled>
      <Link to="/pascal/chapter-about">
        <Button>
          <ButtonBorder />
          <ButtonText>PASCAL</ButtonText>
        </Button>
      </Link>

      <Link to="/reason/chapter-about">
        <Button>
          <ButtonBorder />
          <ButtonText>REASON</ButtonText>
        </Button>
      </Link>

      <Link to="/camel/chapter-about">
        <Button>
          <ButtonBorder />
          <ButtonText>CAMEL</ButtonText>
        </Button>
      </Link>
    </HomepageStyled>
  );
};

HomepageView.propTypes = {};

HomepageView.defaultProps = {};
