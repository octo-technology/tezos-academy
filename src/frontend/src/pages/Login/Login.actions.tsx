import { LoginInputs } from 'shared/user/Login'

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST'
export const GET_LOGIN_COMMIT = 'GET_LOGIN_COMMIT'
export const GET_LOGIN_ROLLBACK = 'GET_LOGIN_ROLLBACK'

export const login = ({ usernameOrEmail, password, recaptchaToken }: LoginInputs) => (dispatch: any) => {
  dispatch({
    type: GET_LOGIN_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/login`,
          method: 'POST',
          json: { usernameOrEmail, password, recaptchaToken },
        },
        commit: { type: GET_LOGIN_COMMIT },
        rollback: { type: GET_LOGIN_ROLLBACK },
      },
    },
  })
}
