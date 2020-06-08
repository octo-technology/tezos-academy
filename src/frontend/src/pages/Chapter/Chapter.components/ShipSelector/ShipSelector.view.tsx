import * as React from 'react'
import Slider from 'rc-slider'
import { useState } from 'react'

import { ShipSelectorStyled, ShipSelectorAttribute, ShipSelectorAttributes } from './ShipSelector.style'
import { Card } from '../Card/Card.controller'

import 'rc-slider/assets/index.css'

export const ShipSelectorView = () => {
  const [shipCode, setShipCode] = useState('101301')

  const handleChange = (pos: number, val: number) => {
    let tempShipCode = shipCode
    tempShipCode = tempShipCode.substring(0, pos) + val.toString() + tempShipCode.substring(pos + 1)
    setShipCode(tempShipCode)
  }

  // @ts-ignore
  return (
    <ShipSelectorStyled>
      <Card shipCode={shipCode} />
      <ShipSelectorAttributes>
        <ShipSelectorAttribute>CLASS</ShipSelectorAttribute>
        <Slider
          onChange={(val) => handleChange(0, val)}
          min={0}
          max={2}
          defaultValue={parseInt(shipCode[0])}
          marks={{ 0: '0', 1: '1', 2: '2' }}
          step={null}
        />
        <ShipSelectorAttribute>CABIN</ShipSelectorAttribute>
        <Slider
          onChange={(val) => handleChange(1, val)}
          min={0}
          max={2}
          defaultValue={parseInt(shipCode[1])}
          marks={{ 0: '0', 1: '1', 2: '2' }}
          step={null}
        />
        <ShipSelectorAttribute>ENGINE</ShipSelectorAttribute>
        <Slider
          onChange={(val) => handleChange(2, val)}
          min={0}
          max={4}
          defaultValue={parseInt(shipCode[2])}
          marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4' }}
          step={null}
        />
        <ShipSelectorAttribute>GUNS</ShipSelectorAttribute>
        <Slider
          onChange={(val) => handleChange(3, val)}
          min={0}
          max={4}
          defaultValue={parseInt(shipCode[3])}
          marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4' }}
          step={null}
        />
        <ShipSelectorAttribute>WINGS</ShipSelectorAttribute>
        <Slider
          onChange={(val) => handleChange(4, val)}
          min={0}
          max={4}
          defaultValue={parseInt(shipCode[4])}
          marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4' }}
          step={null}
        />
        <ShipSelectorAttribute>FLAME</ShipSelectorAttribute>
        <Slider
          onChange={(val) => handleChange(5, val)}
          min={0}
          max={4}
          defaultValue={parseInt(shipCode[5])}
          marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4' }}
          step={null}
        />
      </ShipSelectorAttributes>
    </ShipSelectorStyled>
  )
}
