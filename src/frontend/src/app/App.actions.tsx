import { push } from 'connected-react-router'

export const redirect = (path: string) => (dispatch: any) => {
  dispatch(push(path))
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
