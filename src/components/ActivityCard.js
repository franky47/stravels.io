import React from 'react'
import moment from 'moment'

import './ActivityCard.css'

const defaultUrl = 'http://via.placeholder.com/70x70'

export default class ActivityCard extends React.PureComponent {
  render () {
    const { title, thumbnailUrl = defaultUrl, date, distance, elevation, selected } = this.props
    return (
      <div
        className={`activity-card ${selected ? 'selected' : ''}`}
        onClick={this._onClick}
      >
        <img src={thumbnailUrl} alt='thumbnail' />
        <h3 className='title'>{title}</h3>
        <div className='meta'>
          <span>{ moment(date).format('MMM Do YYYY') }</span>
          <span>{distance.toFixed(2)}km</span>
          <span>{elevation.toFixed(0)}m</span>
        </div>
      </div>
    )
  }
  _onClick = () => {
    this.props.onClick(this.props.id)
  }
}
