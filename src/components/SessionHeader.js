import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import auth from '../lib/auth'

class SessionHeader extends React.Component {
  render () {
    if (!auth.isAuthenticated) return null

    const { meQuery } = this.props
    if (meQuery.loading) {
      return null
    }
    return (
      <React.Fragment>
        <h1>Hello, {meQuery.me.name}</h1>
        <button onClick={this._logout}>Log out</button>
      </React.Fragment>
    )
  }

  _logout = () => {
    // todo: https://www.apollographql.com/docs/react/recipes/authentication.html#login-logout
    const { history } = this.props
    auth.logout()
      .then(() => history.push('/'))
  }
}

const ME_QUERY = gql`
query {
  me {
    name
  }
}
`

export default graphql(ME_QUERY, { name: 'meQuery' })(withRouter(SessionHeader))
