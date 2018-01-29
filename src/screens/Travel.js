import React from 'react'
import SessionHeader from '../components/SessionHeader'

export default ({ match }) => (
  <React.Fragment>
    <SessionHeader />
    <h1>Travel {match.params.id}</h1>
  </React.Fragment>
)
