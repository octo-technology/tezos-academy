/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from "!raw-loader!./course.md";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from "!raw-loader!./exercise.cmd";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from "!raw-loader!./solution.cmd";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import starmap from "!raw-loader!./starmap.mligo";

export const data = { course, exercise, solution, supports: { starmap } };
