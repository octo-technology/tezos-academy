import * as PropTypes from 'prop-types'
import * as React from 'react'

import { Ship } from '../Ship/Ship.controller'
import { CardBottomCorners, CardStyled, CardTitle, CardTopCorners } from './Card.style'

type CardProps = {
  shipCode: string
}

export const CardView = ({ shipCode }: CardProps) => (
  <CardStyled>
    <CardTopCorners />
    <CardBottomCorners />
    <CardTitle id="ship-id">{shipCode}</CardTitle>
    <svg
      className="rocket-svg"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
      viewBox="0 0 270 370"
    >
      <defs></defs>
      <title>Comets</title>
      <g id="comets">
        <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
        <line x1="163" y1="-8" x2="163" y2="699"></line>
        <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
        <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
        <line x1="102" y1="-76" x2="102" y2="489"></line>
        <line x1="26" y1="-19" x2="26" y2="527"></line>
        <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
        <line x1="230" y1="-462" x2="230" y2="663"></line>
        <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
        <line x1="163" y1="-8" x2="163" y2="699"></line>
        <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
        <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
        <line x1="102" y1="-76" x2="102" y2="489"></line>
        <line x1="26" y1="-19" x2="26" y2="527"></line>
        <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
        <line x1="255" y1="-462" x2="255" y2="663"></line>
        <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
        <line x1="163" y1="-8" x2="163" y2="699"></line>
        <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
        <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
        <line x1="102" y1="-76" x2="102" y2="489"></line>
        <line x1="26" y1="-19" x2="26" y2="527"></line>
        <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
        <line x1="276" y1="-462" x2="276" y2="663"></line>
        <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
        <line x1="163" y1="-8" x2="163" y2="699"></line>
        <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
        <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
        <line x1="102" y1="-76" x2="102" y2="489"></line>
        <line x1="26" y1="-19" x2="26" y2="527"></line>
        <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
        <line x1="179" y1="-462" x2="179" y2="663"></line>
        <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
        <line x1="163" y1="-8" x2="163" y2="699"></line>
        <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
        <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
        <line x1="102" y1="-76" x2="102" y2="489"></line>
        <line x1="26" y1="-19" x2="26" y2="527"></line>
        <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
        <line x1="155" y1="-462" x2="155" y2="663"></line>
        <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
        <line x1="163" y1="-8" x2="163" y2="699"></line>
        <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
        <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
        <line x1="102" y1="-76" x2="102" y2="489"></line>
        <line x1="26" y1="-19" x2="26" y2="527"></line>
        <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
        <line x1="291" y1="-462" x2="291" y2="663"></line>
      </g>
    </svg>
    <Ship shipCode={shipCode} />
  </CardStyled>
)

CardView.propTypes = {
  shipCode: PropTypes.string.isRequired,
}

CardView.defaultProps = {}
