import * as React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { PENDING, RIGHT, WRONG } from '../Chapters/Pascal/ChapterAbout/ChapterAbout.constants'

import { ChapterView } from './Chapter.view'
import { chapterData } from './Chapter.data'
import { Footer } from './Chapter.components/Footer/Footer.controller'

export const Chapter = () => {
  const [validatorState, setValidatorState] = useState(PENDING)
  const [showDiff, setShowDiff] = useState(false)
  const { pathname } = useLocation()
  const [data, setData] = useState({ course: undefined, exercise: undefined, solution: undefined })

  useEffect(() => {
    chapterData.forEach((chapter) => {
      if (pathname === chapter.pathname)
        setData({ course: chapter.data.course, exercise: chapter.data.exercise, solution: chapter.data.solution })
    })
  }, [pathname])

  const validateCallback = () => {
    if (showDiff) {
      setShowDiff(false)
      setValidatorState(PENDING)
    } else {
      setShowDiff(true)
      if (data.exercise && data.solution) {
        if (
          // @ts-ignore
          data.exercise.replace(/\s+|\/\/ Type your solution below/g, '') ===
          // @ts-ignore
          data.solution.replace(/\s+|\/\/ Type your solution below/g, '')
        )
          setValidatorState(RIGHT)
        else setValidatorState(WRONG)
      } else setValidatorState(WRONG)
    }
  }

  const proposedSolutionCallback = (e: string) => {
    // @ts-ignore
    setData({ ...data, exercise: e })
  }

  return (
    <>
      <ChapterView
        validatorState={validatorState}
        validateCallback={validateCallback}
        solution={data.solution}
        proposedSolution={data.exercise}
        proposedSolutionCallback={proposedSolutionCallback}
        showDiff={showDiff}
        course={data.course}
      />
      <Footer />
    </>
  )
}
