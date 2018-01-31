import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SessionHeader from '../components/SessionHeader'

class TravelsList extends React.Component {
  render () {
    const { data } = this.props
    return (
      <React.Fragment>
        <SessionHeader />
        <h1>My Travels</h1>
        <ul>
          { !data.loading &&
            data.me.travels.map(this._renderItem)
          }
        </ul>
      </React.Fragment>
    )
  }

  _renderItem = (item) => {
    const { match } = this.props
    return (
      <li key={item.id}>
        <Link to={`${match.url}/${item.id}`} >
          {item.name}
        </Link>
      </li>
    )
  }
}

const query = gql`
query {
  me {
    travels {
      id
      name
    }
  }
}
`

export default graphql(query)(withRouter(TravelsList))
