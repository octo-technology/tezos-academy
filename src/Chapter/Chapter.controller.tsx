import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { PENDING, RIGHT, WRONG } from "../Chapters/ChapterAbout/ChapterAbout.constants";
import { dataAddresses } from "../Chapters/ChapterAddresses";
import { dataBuiltIns } from "../Chapters/ChapterBuiltIns";
import { dataConditionals } from "../Chapters/ChapterConditionals";
import { dataMainFunction } from "../Chapters/ChapterMainFunction";
import { dataFunctions } from "../Chapters/ChapterFunctions";
import { dataLoops } from "../Chapters/ChapterLoops";
import { dataMaps } from "../Chapters/ChapterMaps";
import { dataMath } from "../Chapters/ChapterMath";
import { dataRecords } from "../Chapters/ChapterRecords";
import { dataStrings } from "../Chapters/ChapterStrings";
import { dataTimestamps } from "../Chapters/ChapterTimestamps";
import { dataTypes } from "../Chapters/ChapterTypes";
import { dataVariables } from "../Chapters/ChapterVariables";
import { ChapterView } from "./Chapter.view";
import { dataTuples } from "../Chapters/ChapterTuples";
import { dataFailWith } from "../Chapters/ChapterFailwith";
import { dataVariant } from "../Chapters/ChapterVariant";
import { dataPatternMatching } from "../Chapters/ChapterPatternMatching";
import { dataCast } from "../Chapters/ChapterCast";
import { dataTransactions } from "../Chapters/ChapterTransactions";
import { dataLists } from "../Chapters/ChapterLists";

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
        solution: dataConditionals.solution,
      });
    if (pathname === "/8")
      setData({
        course: dataTuples.course,
        exercise: dataTuples.exercise,
        solution: dataTuples.solution,
      });
    if (pathname === "/9")
      setData({ course: dataRecords.course, exercise: dataRecords.exercise, solution: dataRecords.solution });
    if (pathname === "/10")
      setData({ course: dataMaps.course, exercise: dataMaps.exercise, solution: dataMaps.solution });
    if (pathname === "/11")
      setData({ course: dataLists.course, exercise: dataLists.exercise, solution: dataLists.solution });
    if (pathname === "/12")
      setData({
        course: dataMainFunction.course,
        exercise: dataMainFunction.exercise,
        solution: dataMainFunction.solution,
      });
    if (pathname === "/13")
      setData({
        course: dataTimestamps.course,
        exercise: dataTimestamps.exercise,
        solution: dataTimestamps.solution,
      });
    if (pathname === "/14")
      setData({ course: dataBuiltIns.course, exercise: dataBuiltIns.exercise, solution: dataBuiltIns.solution });
    if (pathname === "/15")
      setData({ course: dataCast.course, exercise: dataCast.exercise, solution: dataCast.solution });
    if (pathname === "/16")
      setData({ course: dataTuples.course, exercise: dataTuples.exercise, solution: dataTuples.solution });
    if (pathname === "/17")
      setData({ course: dataFailWith.course, exercise: dataFailWith.exercise, solution: dataFailWith.solution });
    if (pathname === "/18")
      setData({ course: dataVariant.course, exercise: dataVariant.exercise, solution: dataVariant.solution });
    if (pathname === "/19")
      setData({
        course: dataPatternMatching.course,
        exercise: dataPatternMatching.exercise,
        solution: dataPatternMatching.solution,
      });
    if (pathname === "/20")
      setData({
        course: dataTransactions.course,
        exercise: dataTransactions.exercise,
        solution: dataTransactions.solution,
      });
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
