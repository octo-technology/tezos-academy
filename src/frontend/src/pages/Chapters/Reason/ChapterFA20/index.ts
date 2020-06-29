/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from "!raw-loader!./course.md";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from "!raw-loader!./exercise.religo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from "!raw-loader!./solution.religo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support1 from "!raw-loader!./caller.religo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support2 from "!raw-loader!./tzip-12/fa2_interface.religo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support3 from "!raw-loader!./tzip-12/errors.religo";

export const data = { course, exercise, solution, support1, support2 , support3 };
