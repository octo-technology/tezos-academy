import * as React from "react";
import { useState } from "react";

import { ChapterTypesView } from "./ChapterTypes.view";
import { PENDING, RIGHT, WRONG } from "./ChapterTypes.constants";

export const ChapterTypes = () => {
  const [validatorState, setValidatorState] = useState(PENDING);

  const validateCallback = () => {
    const shipId = document.getElementById("ship-id")?.textContent;
    if (shipId === "020433") setValidatorState(RIGHT);
    else setValidatorState(WRONG);
  };

  return <ChapterTypesView validatorState={validatorState} validateCallback={validateCallback} />;
};
