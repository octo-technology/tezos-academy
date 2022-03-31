import { chapterData } from 'pages/Chapter/Chapter.data'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'

// prettier-ignore
import { UserBadge, UserCard, UserChapter, UserProgress, UserStyled, UserTitle, UserTitle2 } from './User.style'

type UserViewProps = {
  loading: boolean
  user: PublicUser
}

export const UserView = ({ loading, user }: UserViewProps) => {
  let badgeUnlocked = false
  let pascalCounter = 0
  let camelCounter = 0
  let jsCounter = 0
  user.progress?.forEach((chapter) => {
    if (chapter.indexOf('pascal') >= 0) pascalCounter++
    if (chapter.indexOf('camel') >= 0) camelCounter++
    if (chapter.indexOf('js') >= 0) jsCounter++
  })
  if (pascalCounter >= 30 || camelCounter >= 30 || jsCounter >= 30) badgeUnlocked = true

  return (
    <UserStyled>
      <UserTitle>
        <h1>Your badge</h1>
      </UserTitle>
      <UserCard>
        <UserBadge badgeUnlocked={badgeUnlocked}>
          <img src="/images/badge.svg" alt="badge" />
          {badgeUnlocked ? (
            <h1>CONGRATS! YOU ARE NOW A TEZOS EXPERT!</h1>
          ) : (
            <p>
              To obtain this badge, you need to complete the missions of all chapters from 1 track of language below,
              for instance the 30 chapters of the Pascal language.
            </p>
          )}
        </UserBadge>
      </UserCard>

      <UserTitle2>
        <h1>Your progress</h1>
      </UserTitle2>
      <UserCard>
        <UserProgress>
          {chapterData.map((chapter) => {
            const done = user.progress && user.progress.indexOf(chapter.pathname) >= 0
            return (
              <Link to={chapter.pathname}>
                <UserChapter key={chapter.pathname} done={done}>
                  {chapter.name}
                  {done && <img alt="done" src="/icons/check.svg" />}
                </UserChapter>
              </Link>
            )
          })}
        </UserProgress>
      </UserCard>
    </UserStyled>
  )
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
