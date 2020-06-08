import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { ChangePasswordInputs } from 'shared/user/ChangePassword'

import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { State } from '../../reducers'
import { changePassword, changePasswordInit } from './ChangePassword.actions'
import { ChangePasswordView } from './ChangePassword.view'

export const ChangePassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.changePassword.loading)
  const done = useSelector((state: State) => state.changePassword.done)
  const user = useSelector((state: State) => state.auth.user)

  if (done) {
    dispatch(showToaster(SUCCESS, 'Password changed', 'You can now login with your new password'))
    dispatch(changePasswordInit())
    if (user) history.push(`/user/${user.username}`)
  }

  const changePasswordCallback = async (changePasswordInputs: ChangePasswordInputs) => {
    dispatch(changePassword({ ...changePasswordInputs }))
  }

  return <ChangePasswordView changePasswordCallback={changePasswordCallback} loading={loading} />
}
