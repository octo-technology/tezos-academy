/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from '!raw-loader!./exercise.jsligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from '!raw-loader!./solution.jsligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import compile_store from '!raw-loader!./compile_store.cmd'

export const data = { course, exercise, solution, supports: { compile_store } }
