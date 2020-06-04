import * as React from 'react'
import { useSelector } from 'react-redux'

import { HeaderView } from './Header.view'
import { State } from 'reducers'

export const Header = () => {
  const user = useSelector((state: State) => state.auth.user)
  return <HeaderView user={user} />
}
