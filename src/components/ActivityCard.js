import React from 'react'
import moment from 'moment'

import './ActivityCard.css'

const stringifyDistance = d => `${d.toFixed(2)}km`
const stringifyElevation = e => `${e.toFixed(0)}m`

export default ({ title, distance, elevation, date, selected, onClick }) => (
  <section className={`activity-card ${selected ? 'selected' : ''}`}
    onClick={onClick}
  >
    <h3>{title}</h3>
    <div className='activity-subtitle'>
      { moment(date).format('MMMM Do YYYY') } { ' - ' }
      { stringifyDistance(distance) } { ' - ' }
      { stringifyElevation(elevation) }
    </div>
  </section>
)
