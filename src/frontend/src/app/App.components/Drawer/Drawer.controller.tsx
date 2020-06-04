import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { hideDrawer } from './Drawer.actions'
import { DrawerView } from './Drawer.view'

export const Drawer = () => {
  const dispatch = useDispatch()
  const showing = useSelector((state: any) => state.drawer && state.drawer.showing)
  const user = useSelector((state: any) => state && state.auth && state.auth.user)
  const { pathname } = useLocation()
  const history = useHistory()

  let defaultLanguage = 'PascaLIGO'
  if (pathname.match(/pascal/i)) defaultLanguage = 'PascaLIGO'
  if (pathname.match(/camel/i)) defaultLanguage = 'CameLIGO'
  if (pathname.match(/reason/i)) defaultLanguage = 'ReasonLIGO'
  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage)

  useEffect(() => {
    let defaultLanguage = 'PascaLIGO'
    if (pathname.match(/pascal/i)) defaultLanguage = 'PascaLIGO'
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
      history.push(pathname.replace(new RegExp('camel|reason', 'i'), 'pascal'))
      setActiveLanguage('PascaLIGO')
    }
    if (e === 'CameLIGO') {
      history.push(pathname.replace(new RegExp('pascal|reason', 'i'), 'camel'))
      setActiveLanguage('CameLIGO')
    }
    if (e === 'ReasonLIGO') {
      history.push(pathname.replace(new RegExp('camel|pascal', 'i'), 'reason'))
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
