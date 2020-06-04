import * as React from 'react'
import { Link } from 'react-router-dom'

import { HomeStyled } from './Home.style'
import { Button, ButtonBorder, ButtonText } from '../Chapters/Pascal/ChapterAbout/ChapterAbout.style'

export const HomeView = () => {
  return (
    <HomeStyled>
      <Link to="/pascal/chapter-about">
        <Button>
          <ButtonBorder />
          <ButtonText>PASCAL</ButtonText>
        </Button>
      </Link>

      <Link to="/reason/chapter-about">
        <Button>
          <ButtonBorder />
          <ButtonText>REASON</ButtonText>
        </Button>
      </Link>

      <Link to="/camel/chapter-about">
        <Button>
          <ButtonBorder />
          <ButtonText>CAMEL</ButtonText>
        </Button>
      </Link>
    </HomeStyled>
  )
}
