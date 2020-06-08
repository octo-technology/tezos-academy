import { ForgotPasswordInputs } from 'shared/user/ForgotPassword'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_COMMIT = 'FORGOT_PASSWORD_COMMIT'
export const FORGOT_PASSWORD_ROLLBACK = 'FORGOT_PASSWORD_ROLLBACK'

export const FORGOT_PASSWORD_INIT = 'FORGOT_PASSWORD_INIT'
export const forgotPasswordInit = () => (dispatch: any) => {
  dispatch({
    type: FORGOT_PASSWORD_INIT,
  })
}

export const forgotPassword = ({ usernameOrEmail, recaptchaToken }: ForgotPasswordInputs) => (dispatch: any) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/forgot-password`,
          method: 'POST',
          json: { usernameOrEmail, recaptchaToken },
        },
        commit: { type: FORGOT_PASSWORD_COMMIT },
        rollback: { type: FORGOT_PASSWORD_ROLLBACK },
      },
    },
  })
}
