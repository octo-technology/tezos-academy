import { connectRouter } from 'connected-react-router'
import { changePassword, ChangePasswordState } from 'pages/ChangePassword/ChangePassword.reducers'
import { forgotPassword, ForgotPasswordState } from 'pages/ForgotPassword/ForgotPassword.reducers'
import { resetPassword, ResetPasswordState } from 'pages/ResetPassword/ResetPassword.reducers'
import { user, UserState } from 'pages/User/User.reducers'
import { combineReducers } from 'redux'

import { drawer, DrawerState } from '../app/App.components/Drawer/Drawer.reducers'
import { progressBar, ProgressBarState } from '../app/App.components/ProgressBar/ProgressBar.reducers'
import { toaster, ToasterState } from '../app/App.components/Toaster/Toaster.reducers'
import { auth, AuthState } from '../pages/SignUp/SignUp.reducers'
import { serviceWorker, ServiceWorkerState } from './serviceWorker'

export const reducers = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    toaster,
    auth,
    drawer,
    progressBar,
    forgotPassword,
    resetPassword,
    changePassword,
    serviceWorker,
    user
  })

export interface State {
  user: UserState
  toaster: ToasterState
  auth: AuthState
  drawer: DrawerState
  progressBar: ProgressBarState
  forgotPassword: ForgotPasswordState
  resetPassword: ResetPasswordState
  changePassword: ChangePasswordState
  serviceWorker: ServiceWorkerState
}
