/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from '!raw-loader!./exercise.cmd'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import non_fungible_token from '!raw-loader!./non_fungible_token.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from '!raw-loader!./solution.cmd'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_interface from '!raw-loader!./tzip-12/fa2_interface.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_operator_lib from '!raw-loader!./tzip-12/lib/fa2_operator_lib.ligo'

export const data = { course, exercise, solution, supports: {fa2_operator_lib, fa2_interface, non_fungible_token} }
