import React from 'react'
import ActivityCard from './ActivityCard'
import Spinner from './Spinner'

import './ActivityList.css'

export default ({ items, onItemSelect, loading }) => (
  <section className='activity-list'>
    { loading && <Spinner /> }
    { !loading &&
      items.map(({ id, ...rest }) =>
        <ActivityCard key={id} id={id} {...rest} onClick={onItemSelect} />
      )
    }
  </section>
)
