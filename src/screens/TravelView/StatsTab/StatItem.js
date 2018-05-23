import React from 'react'
import './StatItem.css'

export default ({ name, value, unit = null }) => (
  <div className='stat-item'>
    <div className='value'>{value}
      { unit && <span className='unit'> {unit}</span> }
    </div>
    <div className='name'>{name}</div>
  </div>
)
