import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { State } from 'reducers'

import { hideDrawer } from './Drawer.actions'
import { DrawerView } from './Drawer.view'

export const Drawer = () => {
  const dispatch = useDispatch()
  const showing = useSelector((state: State) => state.drawer && state.drawer.showing)
  const user = useSelector((state: State) => state && state.auth && state.auth.user)
  const { pathname } = useLocation()
  const history = useHistory()

  let defaultLanguage = 'PascaLIGO'
  if (pathname.match(/pascal/i)) defaultLanguage = 'PascaLIGO'
  if (pathname.match(/js/i)) defaultLanguage = 'JsLIGO'
  if (pathname.match(/camel/i)) defaultLanguage = 'CameLIGO'
  if (pathname.match(/reason/i)) defaultLanguage = 'ReasonLIGO'
  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage)

  useEffect(() => {
    let defaultLanguage = 'PascaLIGO'
    if (pathname.match(/pascal/i)) defaultLanguage = 'PascaLIGO'
    if (pathname.match(/js/i)) defaultLanguage = 'JsLIGO'
    if (pathname.match(/camel/i)) defaultLanguage = 'CameLIGO'
    if (pathname.match(/reason/i)) defaultLanguage = 'ReasonLIGO'
    setActiveLanguage(defaultLanguage)
  }, [pathname])

  const hideCallback = () => {
    dispatch(hideDrawer())
  }

  function removeAuthUserCallback() {}

  function changeLanguageCallback(e: string) {
    console.log(e)
    if (e === 'PascaLIGO') {
      history.push(pathname.replace(new RegExp('camel|reason|js', 'i'), 'pascal'))
      setActiveLanguage('PascaLIGO')
    }
    if (e === 'JsLIGO') {
      history.push(pathname.replace(new RegExp('camel|reason|pascal', 'i'), 'js'))
      setActiveLanguage('JsLIGO')
    }
    if (e === 'CameLIGO') {
      history.push(pathname.replace(new RegExp('pascal|reason|js', 'i'), 'camel'))
      setActiveLanguage('CameLIGO')
    }
    if (e === 'ReasonLIGO') {
      history.push(pathname.replace(new RegExp('camel|pascal|js', 'i'), 'reason'))
      setActiveLanguage('ReasonLIGO')
    }
  }

  return (
    <DrawerView
      showing={showing}
      hideCallback={hideCallback}
      pathname={pathname}
      user={user}
      removeAuthUserCallback={removeAuthUserCallback}
      changeLanguageCallback={changeLanguageCallback}
      activeLanguage={activeLanguage}
    />
  )
}
