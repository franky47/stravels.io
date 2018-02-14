import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// Components
import ActivityList from '../components/ActivityList'
import Map from '../components/Map'

import './Editor.css'

class Editor extends React.Component {
  state = {
    selected: new Set()
  }

  render () {
    const activities = this.props.data.loading ? [] : this.props.data.activities
      .map(a => ({ ...a, selected: this.state.selected.has(a.id) }))

    const polylines = activities
      .filter(a => a.selected)
      .map(a => ({
        id: a.id,
        encoded: a.polyline
      }))

    return (
      <div className='editor'>
        <ActivityList items={activities} onItemSelect={this._onItemSelect} />
        <Map polylines={polylines} />
      </div>
    )
  }

  _onItemSelect = (id) => {
    const selected = new Set([...this.state.selected]) // Make a copy
    if (selected.has(id)) {
      selected.delete(id)
    } else {
      selected.add(id)
    }
    this.setState({
      selected
    })
  }
}

const query = gql`
query GetActivities($before: Date, $after: Date) {
  activities(before: $before, after: $after) {
    id
    title
    distance(unit: KILOMETERS)
    date(tz: "Europe/Paris")
    thumbnailUrl(retina: true, size: 70)
    elevation
    polyline
  }
}
`
export default graphql(query)(Editor)