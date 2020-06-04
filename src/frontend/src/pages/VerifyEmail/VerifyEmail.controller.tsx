import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { VerifyEmailInputs } from 'shared/user/VerifyEmail'

import { verifyEmail } from './VerifyEmail.actions'
import { VerifyEmailView } from './VerifyEmail.view'
import { State } from '../../reducers'
import { useState } from 'react'

export const VerifyEmail = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.auth.loading)
  const emailVerified = useSelector((state: State) => state.auth.emailVerified)
  const [autoSubmitted, setAutoSubmitted] = useState(false)

  if (emailVerified) history.push('/my-profile')

  const verifyEmailCallback = async (verifyEmailInputs: VerifyEmailInputs) => {
    setAutoSubmitted(true)
    dispatch(verifyEmail({ ...verifyEmailInputs }))
  }

  return <VerifyEmailView verifyEmailCallback={verifyEmailCallback} loading={loading} autoSubmitted={autoSubmitted} />
}
