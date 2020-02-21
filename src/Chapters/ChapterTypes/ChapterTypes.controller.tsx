import * as React from "react";
import { useState } from "react";

import { ChapterTypesView } from "./ChapterTypes.view";
import { PENDING, WRONG } from "./ChapterTypes.constants";

export const ChapterTypes = () => {
  const [validatorState, setValidatorState] = useState(PENDING);

  const validateCallback = () => {
    /*
    type ship_code is string
    const my_ship : ship_code =  '020433'
    */
    setValidatorState(WRONG);
  };

  return <ChapterTypesView validatorState={validatorState} validateCallback={validateCallback} />;
};
