//prettier-ignore
import { FORGOT_PASSWORD_COMMIT, FORGOT_PASSWORD_INIT, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_ROLLBACK } from './ForgotPassword.actions'

export interface ForgotPasswordState {
  loading?: boolean
  token?: string
}

const forgotPasswordState: ForgotPasswordState = {
  loading: false,
  token: undefined,
}

export function forgotPassword(state = forgotPasswordState, action: any): ForgotPasswordState {
  switch (action.type) {
    case FORGOT_PASSWORD_INIT: {
      return {
        ...state,
        loading: false,
        token: undefined,
      }
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
        token: undefined,
      }
    }
    case FORGOT_PASSWORD_COMMIT: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      }
    }
    case FORGOT_PASSWORD_ROLLBACK: {
      return {
        ...state,
        loading: undefined,
      }
    }
    default:
      return state
  }
}
