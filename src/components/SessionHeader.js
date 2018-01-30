import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import auth from '../lib/auth'

import './SessionHeader.css'

class SessionHeader extends React.Component {
  render () {
    if (!auth.isAuthenticated) return null

    const { meQuery } = this.props
    if (meQuery.loading) {
      return null
    }
    return (
      <header className='session'>
        <Link to='/profile'>
          <img
            src={meQuery.me.profilePicture}
            alt={`Profile for ${meQuery.me.name}`}
            className='profilePicture'
          />
        </Link>
      </header>
    )
  }
  // _logout = () => {
  //   // todo: https://www.apollographql.com/docs/react/recipes/authentication.html#login-logout
  //   const { history } = this.props
  //   auth.logout()
  //     .then(() => history.push('/'))
  // }
}

const ME_QUERY = gql`
query {
  me {
    name
    profilePicture
  }
}
`

export default graphql(ME_QUERY, { name: 'meQuery' })(withRouter(SessionHeader))
