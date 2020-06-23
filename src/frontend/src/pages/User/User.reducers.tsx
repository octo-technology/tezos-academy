import { GET_USER_COMMIT, GET_USER_REQUEST, GET_USER_ROLLBACK } from './User.actions'

export interface UserState {
  loading?: boolean
}

const userState: UserState = {
  loading: false,
}

export function user(state = userState, action: any): UserState {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_USER_COMMIT: {
      return {
        ...state,
        loading: false,
        [action.meta.username]: action.payload.user,
      }
    }
    case GET_USER_ROLLBACK: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}
