import * as React from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { SignUpInputs } from 'shared/user/SignUp'

import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { ERROR, SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { State } from '../../reducers'
import { authLoadingStart, signUp } from './SignUp.actions'
import { SignUpView } from './SignUp.view'

export const SignUp = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const loading = useSelector((state: State) => state.auth.loading)
  const user = useSelector((state: State) => state.auth.user)

  if (user) {
    dispatch(showToaster(SUCCESS, `Welcome ${user.username}!`, 'Happy to see you'))
    history.push(`/user/${user.username}`)
  }
  const signUpCallback = async (signUpInputs: SignUpInputs) => {
    dispatch(authLoadingStart())

    if (!executeRecaptcha) {
      dispatch(showToaster(ERROR, 'Recaptcha not ready', 'Please try again'))
      return
    }
    const recaptchaToken = await executeRecaptcha('login')

    dispatch(signUp({ ...signUpInputs, recaptchaToken }))
  }

  return <SignUpView signUpCallback={signUpCallback} loading={loading} />
}
