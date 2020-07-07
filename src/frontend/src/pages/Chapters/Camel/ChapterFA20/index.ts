/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import caller from '!raw-loader!./caller.mligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from '!raw-loader!./exercise.mligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import fungible_token from '!raw-loader!./fungible_token.mligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from '!raw-loader!./solution.mligo'

export const data = { course, exercise, solution, supports: {fungible_token, caller} }
