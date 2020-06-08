import { VerifyEmailInputs } from 'shared/user/VerifyEmail'
import { store } from 'index'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { redirect } from 'app/App.actions'

export const VERIFY_EMAIL_INIT = 'VERIFY_EMAIL_INIT'
export const verifyEmailInit = () => (dispatch: any) => {
  dispatch({
    type: VERIFY_EMAIL_INIT,
  })
}

export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST'
export const VERIFY_EMAIL_COMMIT = 'VERIFY_EMAIL_COMMIT'
export const VERIFY_EMAIL_ROLLBACK = 'VERIFY_EMAIL_ROLLBACK'
export const verifyEmail = ({ solution }: VerifyEmailInputs) => (dispatch: any) => {
  dispatch({
    type: VERIFY_EMAIL_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/verify-email`,
          method: 'POST',
          json: { solution },
          headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
        },
        commit: {
          type: VERIFY_EMAIL_COMMIT,
          meta: {
            thunks: [showToaster(SUCCESS, 'Email verified!', 'Thanks'), verifyEmailInit(), redirect('/')],
          },
        },
        rollback: { type: VERIFY_EMAIL_ROLLBACK },
      },
    },
  })
}
