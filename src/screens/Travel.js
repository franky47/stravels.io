import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import SessionHeader from '../components/SessionHeader'

class Travel extends React.Component {
  render () {
    const { data } = this.props
    if (data.loading) return null
    return (
      <React.Fragment>
        <SessionHeader />
        <h2>{data.travel.name}</h2>
        <ul>
          { data.travel.activities.map(this._renderActivity) }
        </ul>
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
}

const query = gql`
query Travel($id: ID!) {
  travel(id: $id) {
    name
    activities {
      id
      name
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
