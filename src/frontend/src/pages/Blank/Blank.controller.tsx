import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'

import { getBlank } from './Blank.actions'
import { BlankView } from './Blank.view'

export const Blank = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => (state ? true : false))

  useEffect(() => {
    dispatch(getBlank({ username: '' }))
  }, [dispatch])

  return <BlankView loading={loading} />
}
