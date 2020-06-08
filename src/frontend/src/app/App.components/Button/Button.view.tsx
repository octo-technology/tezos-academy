import * as PropTypes from 'prop-types'
import * as React from 'react'

import { BUTTON, ButtonColors, ButtonTypes, PRIMARY } from './Button.constants'
import { ButtonIcon, ButtonLoadingIcon, ButtonStyled, ButtonText } from './Button.style'

type ButtonViewProps = {
  text: string
  icon?: string
  color?: ButtonColors
  onClick?: () => void
  clickCallback: () => void
  clicked: boolean
  type?: ButtonTypes
  loading: boolean
}

export const ButtonView = ({ text, icon, color, onClick, clickCallback, clicked, type, loading }: ButtonViewProps) => {
  let buttonClasses = color
  if (clicked) buttonClasses += ' clicked'
  if (loading) buttonClasses += ' loading'
  return (
    <ButtonStyled
      className={buttonClasses}
      onClick={() => {
        clickCallback()
        onClick && onClick()
      }}
      type={type}
    >
      <ButtonText>
        {loading ? (
          <>
            Loading
            <ButtonLoadingIcon>
              <use xlinkHref="/icons/sprites.svg#circle" />
            </ButtonLoadingIcon>
          </>
        ) : (
          <>
            {text}
            {icon && (
              <ButtonIcon className={color}>
                <use xlinkHref={`/icons/sprites.svg#${icon}`} />
              </ButtonIcon>
            )}
          </>
        )}
      </ButtonText>
    </ButtonStyled>
  )
}

ButtonView.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  clickCallback: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool,
}

ButtonView.defaultProps = {
  icon: undefined,
  color: PRIMARY,
  type: BUTTON,
  loading: false,
}
