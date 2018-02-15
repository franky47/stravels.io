import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loadable from 'react-loadable'

// Components
import ActivityList from '../components/ActivityList'
import Spinner from '../components/Spinner'
import RoR from '../components/RefreshOrRedirect'

import './Editor.css'

const LoadableMap = Loadable({
  loader: () => import('../components/Map'),
  loading ({ error, pastDelay }) {
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (pastDelay) {
      return <Spinner />
    } else {
      return null
    }
  }
})

class Editor extends React.Component {
  state = {
    selected: new Set()
  }

  render () {
    let activities = []
    if (!this.props.data.loading && !this.props.error) {
      activities = this.props.data.activities
    }

    activities = activities
      .map(a => ({ ...a, selected: this.state.selected.has(a.id) }))

    const polylines = activities
      .filter(a => a.selected)
      .reduce((acc, a) => ({
        ...acc,
        [a.id]: a.polyline
      }), {})

    return (
      <div className='editor'>
        <ActivityList items={activities} onItemSelect={this._onItemSelect} loading={this.props.data.loading} />
        <LoadableMap polylines={polylines} />
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

const withGraphQL = graphql(query)

export default withGraphQL(RoR(Editor))
