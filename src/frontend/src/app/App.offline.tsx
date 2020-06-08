import offlineConfig from '@redux-offline/redux-offline/lib/defaults'

import { store } from '../index'
import { showToaster } from './App.components/Toaster/Toaster.actions'
import { ERROR } from './App.components/Toaster/Toaster.constants'
import { safeRestore } from './App.actions'

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
  store.dispatch<any>(safeRestore())
}

export const storeOfflineConfig = {
  ...offlineConfig,
  discard,
  persistCallback,
}

export const reduxOfflineThunkMiddleware = (thunks: any) => (storex: any) => (next: any) => (action: any) => {
  const result = next(action)

  if (action.meta && action.meta.thunks && action.meta.thunks.length > 0) {
    action.meta.thunks.forEach((thunk: any) => {
      if (!!thunk) store.dispatch<any>(thunk)
    })
  }

  return result
}
