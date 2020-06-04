import offlineConfig from '@redux-offline/redux-offline/lib/defaults'

import { store } from '../index'
import { authLoadingStop } from '../pages/SignUp/SignUp.actions'
import { showToaster } from './App.components/Toaster/Toaster.actions'
import { ERROR } from './App.components/Toaster/Toaster.constants'

// const effect = (effect: any, _action: any) => {
//   return axios({
//     ...effect,
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//       Authorization: `Bearer ${store.getState().auth.jwt}`,
//     },
//     baseURL: 'http://localhost:3000',
//   })
// }

const discard = (error: any, _action: any, _retries: any) => {
  const { request, response } = error
  let message = 'Error, please contact support'
  if (response && response.error && typeof response.error === 'string') message = response.error
  else if (response && typeof response === 'string') message = response

  if (response) store.dispatch<any>(showToaster(ERROR, message, 'Contact support if needed'))
  if (!request) throw error
  if (!response) return false
  return 400 <= response.status && response.status < 500
}

const persistCallback = () => {
  store.dispatch<any>(authLoadingStop())
}

export const storeOfflineConfig = {
  ...offlineConfig,
  discard,
  persistCallback,
}
