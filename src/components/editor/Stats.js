import React from 'react'
import StatItem from '../core/StatItem'

import './Stats.css'

export default ({ distance }) => (
  <div className='stats'>
    <StatItem name='distance' value='12.42' unit='km' />
    <StatItem name='elevation' value='1200' unit='m' />
    <StatItem name='duration' value='6:45:12' />
  </div>
)
