import React from 'react'

import './Spinner.css'

export default ({ size = 20, thickness = 3, backColor = '#eee', frontColor = 'limegreen' }) => (
  <div className='spinner' style={{
    width: size - thickness * 2,
    height: size - thickness * 2,
    borderColor: backColor,
    borderTopColor: frontColor,
    borderWidth: thickness
  }} />
)
