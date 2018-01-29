import React from 'react'
import { Link } from 'react-router-dom'
import SessionHeader from '../components/SessionHeader'

export default ({ match }) => (
  <React.Fragment>
    <SessionHeader />
    <h1>My Travels</h1>
    <ul>
      <li><Link to={`${match.url}/foo`}>Foo</Link></li>
      <li><Link to={`${match.url}/bar`}>Bar</Link></li>
      <li><Link to={`${match.url}/egg`}>Egg</Link></li>
      <li><Link to={`${match.url}/spam`}>Spam</Link></li>
    </ul>
  </React.Fragment>
)
