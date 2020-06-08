import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { hideProgressBar } from './ProgressBar.actions'
import { DONE, READY, SHOWING } from './ProgressBar.constants'
import { ProgressBarView } from './ProgressBar.view'
import { State } from 'reducers'

export const ProgressBar = () => {
  const progressBarLoading = useSelector((state: State) => state.auth.loading)
  const [status, setStatus] = useState(READY)
  const dispatch = useDispatch()

  useEffect(() => {
    let timeout
    if (progressBarLoading) {
      setStatus(SHOWING)
      timeout = setTimeout(() => {
        dispatch(hideProgressBar())
        setStatus(READY)
      }, 30000)
    } else {
      setStatus(DONE)
      clearTimeout(timeout)
      setTimeout(() => setStatus(READY), 500)
    }
  }, [progressBarLoading, dispatch])

  return <ProgressBarView status={status} />
}
