import { ResetPasswordInputs } from 'shared/user/ResetPassword'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_COMMIT = 'RESET_PASSWORD_COMMIT'
export const RESET_PASSWORD_ROLLBACK = 'RESET_PASSWORD_ROLLBACK'

export const RESET_PASSWORD_INIT = 'RESET_PASSWORD_INIT'
export const resetPasswordInit = () => (dispatch: any) => {
  dispatch({
    type: RESET_PASSWORD_INIT,
  })
}

export const resetPassword = ({ solution, token, newPassword }: ResetPasswordInputs) => (dispatch: any) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/reset-password`,
          method: 'POST',
          json: { solution, token, newPassword },
        },
        commit: { type: RESET_PASSWORD_COMMIT },
        rollback: { type: RESET_PASSWORD_ROLLBACK },
      },
    },
  })
}
