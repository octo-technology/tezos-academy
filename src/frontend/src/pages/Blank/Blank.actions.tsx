import { store } from 'index'
import { GetPublicUserInputs } from 'shared/user/GetPublicUser'

export const GET_BLANK_REQUEST = 'GET_BLANK_REQUEST'
export const GET_BLANK_COMMIT = 'GET_BLANK_COMMIT'
export const GET_BLANK_ROLLBACK = 'GET_BLANK_ROLLBACK'

export const getBlank = ({ username }: GetPublicUserInputs) => (dispatch: any) => {
  dispatch({
    type: GET_BLANK_REQUEST,
    payload: { username },
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/get-public-user`,
          method: 'GET',
          headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
          json: { username },
        },
        commit: { type: GET_BLANK_COMMIT },
        rollback: { type: GET_BLANK_ROLLBACK },
      },
    },
  })
}
