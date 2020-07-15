/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from "!raw-loader!./course.md";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from "!raw-loader!./exercise.ligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from "!raw-loader!./solution.ligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import starmap from "!raw-loader!./starmap.religo";

export const data = { course, exercise, solution, supports: { starmap } };
