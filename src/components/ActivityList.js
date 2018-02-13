import React from 'react'
import ActivityCard from './ActivityCard'

import './ActivityList.css'

export default ({ items, onItemSelect }) => (
  <section className='activity-list'>
    {
      items.map(({ id, ...rest }) =>
        <ActivityCard key={id} id={id} {...rest} onClick={onItemSelect} />
      )
    }
  </section>
)
