import React from 'react'
import ActivityCard from '../components/ActivityCard'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ActivitySelector = ({ activity, selected, toggleState }) => {
  const toggle = () => toggleState(activity.id)
  return (
    <React.Fragment >
      <input type='checkbox' checked={selected} onChange={toggle} />
      <ActivityCard
        title={activity.name}
        selected={selected}
        onClick={toggle}
        {...activity}
      />
    </React.Fragment>
  )
}

class Activities extends React.Component {
  state = {
    selected: new Set()
  }

  render () {
    const activities = this.props.data.loading ? [] : this.props.data.activities
    return (
      <ul>
        { activities.map(this._renderActivity) }
      </ul>
    )
  }

  _renderActivity = (activity) => (
    <li key={activity.id}>
      <ActivitySelector
        activity={activity}
        selected={this.state.selected.has(activity.id)}
        toggleState={this._toggleState}
      />
    </li>
  )
  _toggleState = (id) => {
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
    elevation
  }
}
`

export default graphql(query)(Activities)
