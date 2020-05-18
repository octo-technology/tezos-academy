import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useState } from 'react'

import { SelectStyled } from './Select.style'

type SelectViewProps = {
  options: string[]
  defaultOption: string
  selectCallback: () => string
}

export const SelectView = ({ options }: SelectViewProps) => {
  const [classes, setClasses] = useState(['select-menu'])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClick = () => {
    // if (classes.includes('open')) setClasses(classes.filter(el => el != 'open'))
    // else setClasses([...classes, 'open'])

    if (!classes.includes('open')) setClasses([...classes, 'open'])
  }

  const handleSelect = (i: number) => {
    setSelectedIndex(i)
    if (i > selectedIndex) setClasses([...classes, 'tilt-down'])
    else if (i < selectedIndex) setClasses([...classes, 'tilt-up'])
    else setClasses(['select-menu'])
    setTimeout(() => {
      setClasses(['select-menu'])
    }, 500)
  }

  return (
    <SelectStyled className={classes.join(' ')} onClick={() => handleClick()}>
      <select data-menu defaultValue={selectedIndex}>
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <div className="selector">
        <em></em>
        <ul style={{ transform: `translateY(-${selectedIndex * 36}px)` }}>
          {options.map(option => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>
      <ul style={{ transform: `translateY(-${selectedIndex * 36}px)` }}>
        {options.map((option, i) => (
          <li key={option} onClick={() => handleSelect(i)}>
            {option}
          </li>
        ))}
      </ul>
    </SelectStyled>
  )
}

SelectView.propTypes = {
  options: PropTypes.array,
  defaultOption: PropTypes.string,
  selectCallback: PropTypes.func
}

SelectView.defaultProps = {
  options: [],
  defaultOption: undefined,
  selectCallback: () => {}
}
