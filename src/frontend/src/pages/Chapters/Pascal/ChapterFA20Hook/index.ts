/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from '!raw-loader!./exercise.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from '!raw-loader!./solution.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_hook from '!raw-loader!./tzip-12/fa2_hook.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_interface from '!raw-loader!./tzip-12/fa2_interface.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_hooks_lib from '!raw-loader!./tzip-12/lib/fa2_hooks_lib.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_operator_lib from '!raw-loader!./tzip-12/lib/fa2_operator_lib.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_transfer_hook_lib from '!raw-loader!./tzip-12/lib/fa2_transfer_hook_lib.ligo'

export const data = {
  course,
  exercise,
  solution,
  supports: {fa2_transfer_hook_lib, fa2_operator_lib, fa2_hooks_lib, fa2_interface, fa2_hook},
}
