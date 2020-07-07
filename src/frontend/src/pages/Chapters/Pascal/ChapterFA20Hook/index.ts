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
import support1 from "!raw-loader!./tzip-12/lib/fa2_transfer_hook_lib.ligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support2 from "!raw-loader!./tzip-12/lib/fa2_operator_lib.ligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support3 from "!raw-loader!./tzip-12/lib/fa2_hooks_lib.ligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support4 from "!raw-loader!./tzip-12/fa2_interface.ligo";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import support5 from "!raw-loader!./tzip-12/fa2_hook.ligo";

export const data = { course, exercise, solution, support1, support2, support3, support4, support5 };
