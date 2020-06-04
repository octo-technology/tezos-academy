//prettier-ignore
import { RESET_PASSWORD_COMMIT, RESET_PASSWORD_INIT, RESET_PASSWORD_REQUEST, RESET_PASSWORD_ROLLBACK } from './ResetPassword.actions'

export interface ResetPasswordState {
  loading?: boolean
  done: boolean
}

const resetPasswordState: ResetPasswordState = {
  loading: false,
  done: false,
}

export function resetPassword(state = resetPasswordState, action: any): ResetPasswordState {
  switch (action.type) {
    case RESET_PASSWORD_INIT: {
      return {
        ...state,
        loading: false,
        done: false,
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
        done: false,
      }
    }
    case RESET_PASSWORD_COMMIT: {
      return {
        ...state,
        loading: false,
        done: true,
      }
    }
    case RESET_PASSWORD_ROLLBACK: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}
