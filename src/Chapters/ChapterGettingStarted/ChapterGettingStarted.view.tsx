import * as React from "react";

import { ChapterGettingStartedStyled, ChapterGettingStartedGrid } from "./ChapterGettingStarted.style";
import { ShipSelector } from "../../ShipSelector/ShipSelector.controller";

export const ChapterGettingStartedView = () => (
  <ChapterGettingStartedStyled>
    <div />
    <ChapterGettingStartedGrid>
      <ShipSelector />
      <div />
    </ChapterGettingStartedGrid>
  </ChapterGettingStartedStyled>
);
