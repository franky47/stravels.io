import React from 'react'
import ActivityCard from './ActivityCard'
import Spinner from './core/Spinner'

import './ActivityList.css'

export default ({ items, loading, hasMore, onItemSelect, onLoadMore }) => (
  <section className='activity-list'>
    {
      items.map(({ id, ...rest }) =>
        <ActivityCard key={id} id={id} {...rest} onClick={onItemSelect} />
      )
    }
    { loading && <Spinner /> }
    { !loading && hasMore &&
      <button onClick={onLoadMore} className='load-more'>
        Load More
      </button>
    }
  </section>
)
