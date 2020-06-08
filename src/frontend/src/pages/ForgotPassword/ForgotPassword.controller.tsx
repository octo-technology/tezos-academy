import * as React from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { ForgotPasswordInputs } from 'shared/user/ForgotPassword'

import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { ERROR, SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { State } from '../../reducers'
import { forgotPassword, forgotPasswordInit } from './ForgotPassword.actions'
import { ForgotPasswordView } from './ForgotPassword.view'

export const ForgotPassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const loading = useSelector((state: State) => state.forgotPassword.loading)
  const token = useSelector((state: State) => state.forgotPassword.token)

  if (token) {
    dispatch(showToaster(SUCCESS, 'Check your email', 'for a reset captcha'))
    dispatch(forgotPasswordInit())
    history.push(`/reset-password/${token}`)
  }

  const forgotPasswordCallback = async (forgotPasswordInputs: ForgotPasswordInputs) => {
    if (!executeRecaptcha) {
      dispatch(showToaster(ERROR, 'Recaptcha not ready', 'Please try again'))
      return
    }
    const recaptchaToken = await executeRecaptcha('signup')

    dispatch(forgotPassword({ ...forgotPasswordInputs, recaptchaToken }))
  }

  return <ForgotPasswordView forgotPasswordCallback={forgotPasswordCallback} loading={loading} />
}
