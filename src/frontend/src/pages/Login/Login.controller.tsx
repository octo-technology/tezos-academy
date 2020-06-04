import * as React from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { LoginInputs } from 'shared/user/Login'

import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { ERROR, SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { State } from '../../reducers'
import { login } from './Login.actions'
import { LoginView } from './Login.view'
import { authLoadingStart } from 'pages/SignUp/SignUp.actions'

export const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const loading = useSelector((state: State) => state.auth.loading)
  const user = useSelector((state: State) => state.auth.user)

  if (user) {
    dispatch(showToaster(SUCCESS, 'Welcome back!', 'Happy to see you again'))
    history.push(`/user/${user.username}`)
  }

  const loginCallback = async (loginInputs: LoginInputs) => {
    dispatch(authLoadingStart())

    if (!executeRecaptcha) {
      dispatch(showToaster(ERROR, 'Recaptcha not ready', 'Please try again'))
      return
    }
    const recaptchaToken = await executeRecaptcha('signup')

    dispatch(login({ ...loginInputs, recaptchaToken }))
  }

  return <LoginView loginCallback={loginCallback} loading={loading} />
}
