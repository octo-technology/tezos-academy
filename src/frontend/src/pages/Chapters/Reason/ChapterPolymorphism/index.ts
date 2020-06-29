/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from "!raw-loader!./course.md";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support1 from "!raw-loader!./squadron.religo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support2 from "!raw-loader!./squadron_types.religo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support3 from "!raw-loader!./central_types.religo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from "!raw-loader!./central.religo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from "!raw-loader!./central_solution.religo";

export const data = { course, exercise, solution, support1, support2, support3 };