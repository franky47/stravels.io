import React from 'react'
import { withRouter } from 'react-router-dom'
import auth from '../auth'

class SessionHeader extends React.Component {
  render () {
    if (!auth.isAuthenticated) return null

    const { name } = this.props
    return (
      <React.Fragment>
        <h1>Hello, {name}</h1>
        <button onClick={this._logout}>Log out</button>
      </React.Fragment>
    )
  }

  _logout = () => {
    const { history } = this.props
    auth.logout()
      .then(() => history.push('/'))
  }
}

export default withRouter(SessionHeader)
