import { LOGIN_COMMIT, LOGIN_REQUEST, LOGIN_ROLLBACK, LOGOUT } from 'pages/Login/Login.actions'
// prettier-ignore
import { VERIFY_EMAIL_COMMIT, VERIFY_EMAIL_INIT, VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_ROLLBACK } from 'pages/VerifyEmail/VerifyEmail.actions'
// prettier-ignore
import { GET_VERIFY_EMAIL_RESEND_COMMIT, GET_VERIFY_EMAIL_RESEND_REQUEST, GET_VERIFY_EMAIL_RESEND_ROLLBACK } from 'pages/VerifyEmail/VerifyEmail.components/VerifyEmailResend/VerifyEmailResend.actions'
import { Jwt } from 'shared/user/Jwt'
import { JwtDecoded } from 'shared/user/JwtDecoded'

// prettier-ignore
import { SIGN_UP_COMMIT, SIGN_UP_REQUEST, SIGN_UP_ROLLBACK } from './SignUp.actions'
import { SAFE_RESTORE, RECAPTCHA_START } from 'app/App.actions'

export interface AuthState {
  jwt?: Jwt
  user?: JwtDecoded
  emailVerified: boolean
  loading?: boolean
}

const authState: AuthState = {
  jwt: undefined,
  user: undefined,
  emailVerified: false,
  loading: false,
}

export function auth(state = authState, action: any): AuthState {
  switch (action.type) {
    case SAFE_RESTORE: {
      return {
        ...state,
        loading: false,
      }
    }
    case RECAPTCHA_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case SIGN_UP_COMMIT: {
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user,
        loading: false,
      }
    }
    case SIGN_UP_ROLLBACK: {
      return {
        ...state,
        jwt: undefined,
        user: undefined,
        loading: false,
      }
    }
    case LOGOUT:
      return {
        ...state,
        jwt: undefined,
        user: undefined,
        loading: false,
      }
    case VERIFY_EMAIL_INIT: {
      return {
        ...state,
        loading: false,
        emailVerified: false,
      }
    }
    case VERIFY_EMAIL_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case VERIFY_EMAIL_COMMIT: {
      return {
        ...state,
        emailVerified: true,
        loading: false,
      }
    }
    case VERIFY_EMAIL_ROLLBACK: {
      return {
        ...state,
        emailVerified: false,
        loading: false,
      }
    }
    case GET_VERIFY_EMAIL_RESEND_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_VERIFY_EMAIL_RESEND_COMMIT: {
      return {
        ...state,
        loading: false,
      }
    }
    case GET_VERIFY_EMAIL_RESEND_ROLLBACK: {
      return {
        ...state,
        loading: false,
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case LOGIN_COMMIT: {
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user,
        loading: false,
      }
    }
    case LOGIN_ROLLBACK: {
      return {
        ...state,
        jwt: undefined,
        user: undefined,
        loading: false,
      }
    }
    default:
      return state
  }
}
