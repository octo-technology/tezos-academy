/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from "!raw-loader!./course.md";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from "!raw-loader!./exercise.religo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from "!raw-loader!./solution.religo";

export const data = { course, exercise, solution };
