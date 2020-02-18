import * as React from "react";
import { useState } from "react";

import { ChapterAboutView } from "./ChapterAbout.view";
import { PENDING, RIGHT, WRONG } from "./ChapterAbout.constants";

export const ChapterAbout = () => {
  const [validatorState, setValidatorState] = useState(PENDING);

  const validateCallback = () => {
    const shipId = document.getElementById("ship-id")?.textContent;
    if (shipId === "020433") setValidatorState(RIGHT);
    else setValidatorState(WRONG);
  };

  return <ChapterAboutView validatorState={validatorState} validateCallback={validateCallback} />;
};
