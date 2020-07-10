/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from '!raw-loader!./exercise.cmd'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from '!raw-loader!./solution.cmd'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import tqtz_nft from '!raw-loader!./tqtz_nft.mligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_errors from '!raw-loader!./tzip-12/fa2_errors.mligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_interface from '!raw-loader!./tzip-12/fa2_interface.mligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_convertors from '!raw-loader!./tzip-12/lib/fa2_convertors.mligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fa2_operator_lib from '!raw-loader!./tzip-12/lib/fa2_operator_lib.mligo'

export const data = {
  course,
  exercise,
  solution,
  supports: {fa2_convertors, fa2_operator_lib, fa2_interface, fa2_errors, tqtz_nft},
}
