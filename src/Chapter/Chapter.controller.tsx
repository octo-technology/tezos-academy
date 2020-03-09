import * as React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useState } from "react";

import { PENDING, RIGHT, WRONG } from "../Chapters/ChapterAbout/ChapterAbout.constants";
import { ChapterView } from "./Chapter.view";

import { dataTypes } from "../Chapters/ChapterTypes";
import { dataVariables } from "../Chapters/ChapterVariables";

export const Chapter = () => {
  const [validatorState, setValidatorState] = useState(PENDING);
  const [showDiff, setShowDiff] = useState(false);
  const { pathname } = useLocation();
  const [data, setData] = useState({ course: undefined, exercise: undefined, solution: undefined });

  useEffect(() => {
    if (pathname === "/2")
      setData({ course: dataTypes.course, exercise: dataTypes.exercise, solution: dataTypes.solution });
    if (pathname === "/3")
      setData({ course: dataVariables.course, exercise: dataVariables.exercise, solution: dataVariables.solution });
  }, [pathname]);

  const validateCallback = () => {
    if (showDiff) {
      setShowDiff(false);
      setValidatorState(PENDING);
    } else {
      setShowDiff(true);
      if (data.exercise === data.solution) setValidatorState(RIGHT);
      else setValidatorState(WRONG);
    }
  };

  const proposedSolutionCallback = (e: string) => {
    setData({ exercise: e, ...data });
  };

  return (
    <ChapterView
      validatorState={validatorState}
      validateCallback={validateCallback}
      solution={data.solution}
      proposedSolution={data.exercise}
      proposedSolutionCallback={proposedSolutionCallback}
      showDiff={showDiff}
      course={data.course}
    />
  );
};
