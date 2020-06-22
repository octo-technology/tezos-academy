import * as PropTypes from 'prop-types'
import * as React from 'react'
import { PublicUser } from 'shared/user/PublicUser'

// prettier-ignore
import { UserStyled } from './User.style'

type UserViewProps = {
  loading: boolean
  user: PublicUser
}

export const UserView = ({ loading, user }: UserViewProps) => {
  return <UserStyled>{user.progress}</UserStyled>
}

UserView.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
}

UserView.defaultProps = {
  loading: false,
  user: {
    username: 'Not found',
    karmaTotal: 0,
  },
}
