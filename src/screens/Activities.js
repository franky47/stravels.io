import React from 'react'
import ActivityList from '../components/ActivityList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Activities extends React.Component {
  state = {
    selected: new Set()
  }

  render () {
    const activities = this.props.data.loading ? [] : this.props.data.activities
      .map(a => ({ ...a, selected: this.state.selected.has(a.id) }))
    return <ActivityList items={activities} onItemSelect={this._onItemSelect} />
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
  activities: getActivities(before: $before, after: $after) {
    id
    title
    distance(unit: KILOMETERS)
    date(tz: "Europe/Paris")
    # todo: add thumbnailUrl
    elevation
  }
}
`

export default graphql(query)(Activities)
