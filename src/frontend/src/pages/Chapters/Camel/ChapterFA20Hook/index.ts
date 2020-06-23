/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from "!raw-loader!./course.md";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from "!raw-loader!./exercise.mligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from "!raw-loader!./solution.mligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support1 from "!raw-loader!./tzip-12/lib/fa2_convertors.mligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support2 from "!raw-loader!./tzip-12/lib/fa2_operator_lib.mligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support3 from "!raw-loader!./tzip-12/lib/fa2_owner_hooks_lib.mligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support4 from "!raw-loader!./tzip-12/fa2_interface.mligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support5 from "!raw-loader!./tzip-12/fa2_errors.mligo";

/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support6 from "!raw-loader!./fa2_core.mligo";

export const data = { course, exercise, solution, support1, support2, support3, support4, support5, support6 };
