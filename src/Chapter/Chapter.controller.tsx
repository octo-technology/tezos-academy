import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { PENDING, RIGHT, WRONG } from "../Chapters/ChapterAbout/ChapterAbout.constants";
import { dataConditionals } from "../Chapters/ChapterConditionals";
import { dataFunctions } from "../Chapters/ChapterFunctions";
import { dataMaps } from "../Chapters/ChapterMaps";
import { dataLoops } from "../Chapters/ChapterLoops";
import { dataMath } from "../Chapters/ChapterMath";
import { dataRecords } from "../Chapters/ChapterRecords";
import { dataStrings } from "../Chapters/ChapterStrings";
import { dataTypes } from "../Chapters/ChapterTypes";
import { dataVariables } from "../Chapters/ChapterVariables";
import { ChapterView } from "./Chapter.view";

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
    if (pathname === "/4")
      setData({ course: dataMath.course, exercise: dataMath.exercise, solution: dataMath.solution });
    if (pathname === "/5")
      setData({ course: dataStrings.course, exercise: dataStrings.exercise, solution: dataStrings.solution });
    if (pathname === "/6")
      setData({ course: dataFunctions.course, exercise: dataFunctions.exercise, solution: dataFunctions.solution });
    if (pathname === "/7")
      setData({
        course: dataConditionals.course,
        exercise: dataConditionals.exercise,
        solution: dataConditionals.solution
      });
    if (pathname === "/8")
      setData({ course: dataLoops.course, exercise: dataLoops.exercise, solution: dataLoops.solution });
    if (pathname === "/9")
      setData({ course: dataRecords.course, exercise: dataRecords.exercise, solution: dataRecords.solution });
    if (pathname === "/10")
      setData({ course: dataMaps.course, exercise: dataMaps.exercise, solution: dataMaps.solution });
  }, [pathname]);

  const validateCallback = () => {
    if (showDiff) {
      setShowDiff(false);
      setValidatorState(PENDING);
    } else {
      setShowDiff(true);
      if (data.exercise && data.solution) {
        if (
          // @ts-ignore
          data.exercise.replace(/\s+|\/\/ Type your solution below/g, "") ===
          // @ts-ignore
          data.solution.replace(/\s+|\/\/ Type your solution below/g, "")
        )
          setValidatorState(RIGHT);
        else setValidatorState(WRONG);
      } else setValidatorState(WRONG);
    }
  };

  const proposedSolutionCallback = (e: string) => {
    console.log({ course: data.course, exercise: e, solution: data.solution });
    // @ts-ignore
    setData({ ...data, exercise: e });
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
