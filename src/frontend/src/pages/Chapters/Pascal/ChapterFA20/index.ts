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
import support1 from "!raw-loader!./fungible_token.ligo";


export const data = { course, exercise, solution, support1 };
