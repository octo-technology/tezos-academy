import { store } from 'index'

export const GET_VERIFY_EMAIL_RESEND_REQUEST = 'GET_VERIFY_EMAIL_RESEND_REQUEST'
export const GET_VERIFY_EMAIL_RESEND_COMMIT = 'GET_VERIFY_EMAIL_RESEND_COMMIT'
export const GET_VERIFY_EMAIL_RESEND_ROLLBACK = 'GET_VERIFY_EMAIL_RESEND_ROLLBACK'

export const resendVerifyEmail = () => (dispatch: any) => {
  dispatch({
    type: GET_VERIFY_EMAIL_RESEND_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/resend-email-verification`,
          method: 'POST',
          headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
        },
        commit: { type: GET_VERIFY_EMAIL_RESEND_COMMIT },
        rollback: { type: GET_VERIFY_EMAIL_RESEND_ROLLBACK },
      },
    },
  })
}
