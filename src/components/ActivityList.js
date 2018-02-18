import React from 'react'
import ActivityCard from './ActivityCard'
import Spinner from './core/Spinner'

import './ActivityList.css'

export default ({ items, loading, hasMore, onItemSelect, onLoadMore }) => {
  if (items.length === 0) {
    return (
      <section className='activity-list'>
        <p className='empty'>No activities</p>
      </section>
    )
  }
  return (
    <section className='activity-list'>
      {
        items.map(({ id, ...rest }) =>
          <ActivityCard key={id} id={id} {...rest} onClick={onItemSelect} />
        )
      }
      { loading && <Spinner size={30} /> }
      { !loading && hasMore &&
        <button onClick={onLoadMore} className='load-more'>
          Load More
        </button>
      }
    </section>
  )
}
