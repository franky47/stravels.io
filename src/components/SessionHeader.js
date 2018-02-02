import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import auth from '../lib/auth'

import './SessionHeader.css'

class SessionHeader extends React.Component {
  render () {
    if (!auth.isAuthenticated) return null

    const { data } = this.props
    if (data.loading) {
      return null
    }
    const { fullName, profilePicture } = data.me
    return (
      <header className='session'>
        <Link to='/profile'>
          <img
            src={profilePicture}
            alt={`Profile for ${fullName}`}
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

const query = gql`
query {
  me {
    fullName
    profilePicture
  }
}
`

export default graphql(query)(withRouter(SessionHeader))
