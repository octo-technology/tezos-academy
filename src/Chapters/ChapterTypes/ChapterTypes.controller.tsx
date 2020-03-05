import * as React from "react";
import { useState } from "react";

import { PENDING, RIGHT, WRONG } from "./ChapterTypes.constants";
import { ChapterTypesView } from "./ChapterTypes.view";

export const ChapterTypes = () => {
  const [validatorState, setValidatorState] = useState(PENDING);
  const [showDiff, setShowDiff] = useState(false);

  const [proposedSolution, setProposedSolution] = useState(`// Type your solution below
`);

  const solution = `// Type your solution below
type ship_code is string
const my_ship : ship_code =  '020433'`;

  const validateCallback = () => {
    if (showDiff) {
      setShowDiff(false);
      setValidatorState(PENDING);
    } else {
      setShowDiff(true);
      if (proposedSolution === solution) setValidatorState(RIGHT);
      else setValidatorState(WRONG);
    }
  };

  const proposedSolutionCallback = (e: string) => {
    setProposedSolution(e);
  };

  return (
    <ChapterTypesView
      validatorState={validatorState}
      validateCallback={validateCallback}
      solution={solution}
      proposedSolution={proposedSolution}
      proposedSolutionCallback={proposedSolutionCallback}
      showDiff={showDiff}
    />
  );
};
