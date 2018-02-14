import React from 'react'
import { Redirect, withRouter } from 'react-router'
import { qsEncode, qsDecode } from '../lib/utility'
import base64 from '../lib/base64'
import auth from '../lib/auth'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import logo from '../resources/stravels-logo.svg'
import './Login.css'

class Login extends React.Component {
  state = {
    redirect: false,
    from: {
      pathname: '/'
    }
  }

  componentDidMount () {
    this._resumeAuthFlow()
  }

  render () {
    const { redirect, from } = this.state
    if (redirect) {
      return <Redirect to={from} />
    }
    return (
      <section className='login'>
        <img src={logo} alt='logo' />
        <h1>Stravels</h1>
        <a href={this._getRequestURL()}>Login with Strava</a>
      </section>
    )
  }

  _getRequestURL = () => {
    // Save where we came from for state traversal
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const isProd = process.env.NODE_ENV === 'production'
    const url = 'https://www.strava.com/oauth/authorize'
    const host = isProd ? `https://${window.location.host}` : `http://localhost:${window.location.port}`
    const query = {
      client_id: 19454,
      redirect_uri: `${host}/login`,
      response_type: 'code',
      approval_prompt: isProd ? 'auto' : 'force',
      scope: 'view_private',
      state: base64.encode(JSON.stringify(from))
    }
    return url + '?' + qsEncode(query)
  }
  _resumeAuthFlow = () => {
    // Extract auth code & state traversal from URL
    const { code, state } = qsDecode(this.props.location.search)
    if (!state || !code) {
      return
    }
    // Extract previous location from state traversal
    const from = JSON.parse(base64.decode(state))
    this.setState({ from })

    this.props.loginWithCode({
      variables: {
        code
      }
    }).then(({ data }) => {
      auth.authenticate(data.jwt)
      this.setState({
        redirect: true // Activate redirection
      })
    })
  }
}

const mutation = gql`
mutation LoginWithCode($code: AuthenticationCode!) {
  jwt: loginWithCode(code: $code)
}
`
const withGraphQL = graphql(mutation, {
  name: 'loginWithCode'
})

export default withGraphQL(withRouter(Login))
