/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import extra from '!raw-loader!./extra.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from '!raw-loader!./inventory_exercise.ligo'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from '!raw-loader!./inventory_solution.ligo'

export const data = { course, exercise, solution, supports: {extra} }
