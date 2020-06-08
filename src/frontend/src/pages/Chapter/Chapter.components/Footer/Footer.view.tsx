import { chapterData } from 'pages/Chapter/Chapter.data'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { FooterCredits, FooterStyled } from './Footer.style'

export const FooterView = () => {
  const { pathname } = useLocation()
  let previousChapter = '/'
  let nextChapter = '/'

  chapterData.forEach((chapter, i) => {
    if (pathname === chapter.pathname) {
      if (i - 1 >= 0) previousChapter = chapterData[i - 1].pathname
      if (i + 1 < chapterData.length) nextChapter = chapterData[i + 1].pathname
    }
  })

  return (
    <FooterStyled>
      <Link to={previousChapter}>
        <img alt="Previous Chapter" src="/elements/previous-chapter.svg" />
      </Link>
      <Link to={nextChapter}>
        <img alt="Next Chapter" src="/elements/next-chapter.svg" />
      </Link>
      <FooterCredits>
        MADE WITH ♡ BY{' '}
        <a href="https://www.linkedin.com/in/aymeric-bethencourt-96665046/" target="_blank" rel="noopener noreferrer">
          AYMERIC BETHENCOURT
        </a>{' '}
        AND{' '}
        <a href="https://octo.com/" target="_blank" rel="noopener noreferrer">
          OCTO TECHNOLOGY
        </a>
      </FooterCredits>
    </FooterStyled>
  )
}
