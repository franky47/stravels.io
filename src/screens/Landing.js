import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import auth from '../lib/auth'

export default () => {
  if (auth.isAuthenticated) {
    return <Redirect to='/travels' />
  }
  return (
    <React.Fragment>
      <h1>Landing</h1>
      <Link to='/travels'>My travels</Link>
    </React.Fragment>
  )
}
