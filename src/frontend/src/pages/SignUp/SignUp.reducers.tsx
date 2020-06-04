import { GET_LOGIN_COMMIT, GET_LOGIN_REQUEST, GET_LOGIN_ROLLBACK } from 'pages/Login/Login.actions'
import { VERIFY_EMAIL_COMMIT, VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_ROLLBACK } from 'pages/VerifyEmail/VerifyEmail.actions'
// prettier-ignore
import { GET_VERIFY_EMAIL_RESEND_COMMIT, GET_VERIFY_EMAIL_RESEND_REQUEST, GET_VERIFY_EMAIL_RESEND_ROLLBACK } from 'pages/VerifyEmail/VerifyEmail.components/VerifyEmailResend/VerifyEmailResend.actions'
import { Jwt } from 'shared/user/Jwt'
import { JwtDecoded } from 'shared/user/JwtDecoded'

// prettier-ignore
import { AUTH_LOADING_START, AUTH_LOADING_STOP, LOGOUT, SIGN_UP_COMMIT, SIGN_UP_REQUEST, SIGN_UP_ROLLBACK } from './SignUp.actions'

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
    case AUTH_LOADING_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case AUTH_LOADING_STOP: {
      return {
        ...state,
        loading: false,
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
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_LOGIN_COMMIT: {
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user,
        loading: false,
      }
    }
    case GET_LOGIN_ROLLBACK: {
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
