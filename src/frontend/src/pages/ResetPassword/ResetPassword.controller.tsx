import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ResetPasswordInputs } from 'shared/user/ResetPassword'

import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { State } from '../../reducers'
import { resetPassword, resetPasswordInit } from './ResetPassword.actions'
import { ResetPasswordView } from './ResetPassword.view'

export const ResetPassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  let { token } = useParams()
  const loading = useSelector((state: State) => state.resetPassword.loading)
  const done = useSelector((state: State) => state.resetPassword.done)

  if (done) {
    dispatch(showToaster(SUCCESS, 'Password sucessfully changed', 'You can now login'))
    dispatch(resetPasswordInit())
    history.push(`/login`)
  }

  const resetPasswordCallback = async (resetPasswordInputs: ResetPasswordInputs) => {
    dispatch(resetPassword({ ...resetPasswordInputs, token }))
  }

  return <ResetPasswordView resetPasswordCallback={resetPasswordCallback} loading={loading} />
}
