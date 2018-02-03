import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import SessionHeader from '../components/SessionHeader'
import Map from '../components/Map'

class Travel extends React.Component {
  render () {
    const { data } = this.props
    if (data.loading) return null
    const revActivities = [...data.travel.activities].reverse()
    return (
      <React.Fragment>
        <SessionHeader />
        <h2>{data.travel.name}</h2>
        <ul>
          { data.travel.activities.map(this._renderActivity) }
        </ul>
        <Map
          polylines={revActivities.map(this._formatPolyline)}
          colorBase={this._generateBaseColor()}
        />
      </React.Fragment>
    )
  }

  _renderActivity = (item) => {
    return (
      <li key={item.id}>
        {item.name}
      </li>
    )
  }
  _formatPolyline = ({ id, polyline }) => ({ id, encoded: polyline })
  _generateBaseColor = () => this.props.data.travel.name
    .split('')
    .map(c => c.charCodeAt(0))
    .reduce((acc, c) => acc % 2 ? acc * c : acc + c) % 360
}

const query = gql`
query Travel($id: ID!) {
  travel(id: $id) {
    name
    activities {
      id
      name
      polyline
    }
  }
}
`

export default graphql(query, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
})(withRouter(Travel))
