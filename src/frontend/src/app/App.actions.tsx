// import { push } from 'connected-react-router'
import { history } from './App.store'

export const redirect = (path: string) => (dispatch: any) => {
  dispatch(history.push(path))
}

export const SAFE_RESTORE = 'SAFE_RESTORE'
export const safeRestore = () => (dispatch: any) => {
  dispatch({
    type: SAFE_RESTORE,
  })
}

export const RECAPTCHA_START = 'RECAPTCHA_START'
export const recaptchaStart = () => (dispatch: any) => {
  dispatch({
    type: RECAPTCHA_START,
  })
}
