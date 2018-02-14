import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'

// Components
import ActivityList from '../components/ActivityList'
import Map from '../components/Map'

import './Editor.css'

const RedirectOnError = (path = '/') => Component => (props) => {
  if (!props.data.loading && props.data.error) {
    console.log(`Error found, redirecting to ${path}`)
    return <Redirect to={path} />
  } else {
    return <Component {...props} />
  }
}

class Editor extends React.Component {
  state = {
    selected: new Set()
  }

  render () {
    if (this.props.data.loading) {
      return <p>Loading...</p>
    }

    const activities = this.props.data.activities
      .map(a => ({ ...a, selected: this.state.selected.has(a.id) }))

    const polylines = activities
      .filter(a => a.selected)
      .reduce((acc, a) => ({
        ...acc,
        [a.id]: a.polyline
      }), {})

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
export default graphql(query)(RedirectOnError('/login')(Editor))
