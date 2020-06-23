import { addProgress } from 'pages/Chapter/Chapter.actions'
import { Footer } from 'pages/Chapter/Chapter.components/Footer/Footer.controller'
import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { State } from 'reducers'

import { PENDING, RIGHT, WRONG } from './ChapterAbout.constants'
import { ChapterAboutView } from './ChapterAbout.view'

export const ChapterAbout = () => {
  const [validatorState, setValidatorState] = useState(PENDING)
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)
  const { pathname } = useLocation()

  const validateCallback = () => {
    const shipId = document.getElementById('ship-id')?.textContent
    if (shipId === '020433') {
      setValidatorState(RIGHT)
      if (user) dispatch(addProgress({ chapterDone: pathname }))
    } else setValidatorState(WRONG)
  }

  return (
    <>
      <ChapterAboutView validatorState={validatorState} validateCallback={validateCallback} />
      <Footer />
    </>
  )
}
