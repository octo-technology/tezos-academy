import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'

import { getUser } from './User.actions'
import { UserView } from './User.view'
import { useParams } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'

export const User = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.user.loading)
  let { username } = useParams()
  const user = useSelector((state: State) => (state.user as Record<string, PublicUser | undefined>)[username])

  useEffect(() => {
    dispatch(getUser({ username }))
  }, [dispatch, username])

  return <UserView loading={loading} user={user} />
}
