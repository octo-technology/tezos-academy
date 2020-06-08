import * as React from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useDispatch, useSelector } from 'react-redux'
import { LoginInputs } from 'shared/user/Login'

import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { ERROR } from '../../app/App.components/Toaster/Toaster.constants'
import { State } from '../../reducers'
import { login } from './Login.actions'
import { LoginView } from './Login.view'
import { recaptchaStart } from 'app/App.actions'

export const Login = () => {
  const dispatch = useDispatch()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const loading = useSelector((state: State) => state.auth.loading)

  const loginCallback = async (loginInputs: LoginInputs) => {
    dispatch(recaptchaStart())

    if (!executeRecaptcha) {
      dispatch(showToaster(ERROR, 'Recaptcha not ready', 'Please try again'))
      return
    }
    const recaptchaToken = await executeRecaptcha('signup')

    dispatch(login({ ...loginInputs, recaptchaToken }))
  }

  return <LoginView loginCallback={loginCallback} loading={loading} />
}
