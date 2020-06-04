//prettier-ignore
import { CHANGE_PASSWORD_COMMIT, CHANGE_PASSWORD_INIT, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_ROLLBACK } from './ChangePassword.actions'

export interface ChangePasswordState {
  loading?: boolean
  done: boolean
}

const changePasswordState: ChangePasswordState = {
  loading: false,
  done: false,
}

export function changePassword(state = changePasswordState, action: any): ChangePasswordState {
  switch (action.type) {
    case CHANGE_PASSWORD_INIT: {
      return {
        ...state,
        loading: false,
        done: false,
      }
    }
    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
        done: false,
      }
    }
    case CHANGE_PASSWORD_COMMIT: {
      return {
        ...state,
        loading: false,
        done: true,
      }
    }
    case CHANGE_PASSWORD_ROLLBACK: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}
