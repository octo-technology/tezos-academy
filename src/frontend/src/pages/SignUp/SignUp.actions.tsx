import { SignUpInputs } from 'shared/user/SignUp'

export const LOGOUT = 'LOGOUT'
export const signout = () => (dispatch: any) => {
  dispatch({
    type: LOGOUT,
  })
}

export const AUTH_LOADING_START = 'AUTH_LOADING_START'
export const authLoadingStart = () => (dispatch: any) => {
  dispatch({
    type: AUTH_LOADING_START,
  })
}

export const AUTH_LOADING_STOP = 'AUTH_LOADING_STOP'
export const authLoadingStop = () => (dispatch: any) => {
  dispatch({
    type: AUTH_LOADING_STOP,
  })
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_COMMIT = 'SIGN_UP_COMMIT'
export const SIGN_UP_ROLLBACK = 'SIGN_UP_ROLLBACK'
export const signUp = ({ email, password, confirmPassword, username, recaptchaToken }: SignUpInputs) => (
  dispatch: any,
) => {
  dispatch({
    type: SIGN_UP_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/sign-up`,
          method: 'POST',
          json: { email, password, confirmPassword, username, recaptchaToken },
        },
        commit: { type: SIGN_UP_COMMIT, meta: {} },
        rollback: { type: SIGN_UP_ROLLBACK, meta: {} },
      },
    },
  })
}
