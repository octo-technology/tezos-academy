import { chapterData } from 'pages/Chapter/Chapter.data'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'

import { Select } from '../Select/Select.controller'
import { DrawerItem, DrawerMask, DrawerStyled } from './Drawer.style'

type DrawerViewProps = {
  showing: boolean
  hideCallback: () => void
  pathname: string
  user: any
  removeAuthUserCallback: () => void
  changeLanguageCallback: (e: string) => void
  activeLanguage: string
}

export const DrawerView = ({
  showing,
  hideCallback,
  pathname,
  user,
  removeAuthUserCallback,
  changeLanguageCallback,
  activeLanguage,
}: DrawerViewProps) => (
  <>
    <DrawerMask className={`${showing}`} onClick={() => hideCallback()} />
    <DrawerStyled className={`${showing}`}>
      <h1>Menu</h1>

      <Select
        options={['PascaLIGO', 'CameLIGO', 'ReasonLIGO', 'JsLIGO']}
        defaultOption={activeLanguage}
        selectCallback={(e) => changeLanguageCallback(e)}
      />

      {chapterData.map((chapter) => {
        if (chapter.language === activeLanguage)
          return (
            <DrawerItem
              key={chapter.pathname}
              className={pathname === chapter.pathname ? 'current-path' : 'other-path'}
            >
              <Link to={chapter.pathname} onClick={() => hideCallback()}>
                {chapter.name}
              </Link>
            </DrawerItem>
          )
        else return <div key={chapter.pathname} />
      })}
    </DrawerStyled>
  </>
)

DrawerView.propTypes = {
  showing: PropTypes.bool,
  hideCallback: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  user: PropTypes.object,
  removeAuthUserCallback: PropTypes.func.isRequired,
  changeLanguageCallback: PropTypes.func.isRequired,
  activeLanguage: PropTypes.string.isRequired,
}

DrawerView.defaultProps = {
  showing: false,
  user: undefined,
}
