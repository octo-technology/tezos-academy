import { ChangePasswordInputs } from 'shared/user/ChangePassword'
import { store } from 'index'

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_COMMIT = 'CHANGE_PASSWORD_COMMIT'
export const CHANGE_PASSWORD_ROLLBACK = 'CHANGE_PASSWORD_ROLLBACK'

export const CHANGE_PASSWORD_INIT = 'CHANGE_PASSWORD_INIT'
export const changePasswordInit = () => (dispatch: any) => {
  dispatch({
    type: CHANGE_PASSWORD_INIT,
  })
}

export const changePassword = ({ password, newPassword }: ChangePasswordInputs) => (dispatch: any) => {
  dispatch({
    type: CHANGE_PASSWORD_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/change-password`,
          method: 'POST',
          json: { password, newPassword },
          headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
        },
        commit: { type: CHANGE_PASSWORD_COMMIT },
        rollback: { type: CHANGE_PASSWORD_ROLLBACK },
      },
    },
  })
}
