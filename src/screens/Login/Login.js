// @flow

import React from 'react'
import { Redirect, withRouter } from 'react-router'
import auth from 'lib/auth'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import { qsDecode } from 'lib/utility'
import { decodeStateTraversal, getStravaOAuthURL } from 'lib/login'

import Logo from 'components/core/Logo'
import LoginButton from './LoginButton'
import poweredByStrava from './poweredByStrava.svg'

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper
  },
  logo: {
    position: 'absolute',
    top: '40vh',
    transform: 'translateY(-50%)'
  },
  button: {
    position: 'absolute',
    top: '70vh',
    transform: 'translateY(-50%)'
  },
  poweredByStrava: {
    maxHeight: 30,
    marginBottom: theme.spacing.unit
  }
})

type Props = {
  +classes: Object,
  // GraphQL-injected
  +loginWithCode: Object => Promise<Object>
}
type State = {
  redirect: boolean,
  from: ?{
    pathname: string
  },
  loading: boolean
}

class Login extends React.Component<Props, State> {
  state = {
    redirect: false,
    from: {
      pathname: '/'
    },
    loading: false
  }

  componentDidMount() {
    this._resumeAuthFlow()
  }

  render() {
    const { classes } = this.props
    const { redirect, from, loading } = this.state
    if (redirect) {
      return <Redirect to={from} />
    }
    return (
      <section className="login" className={classes.root}>
        <Logo size={80} className={classes.logo} />
        <LoginButton
          url={this._getRequestURL()}
          loading={loading}
          className={classes.button}
        />
        <img
          src={poweredByStrava}
          alt="Powered by Strava"
          className={classes.poweredByStrava}
        />
      </section>
    )
  }

  _getRequestURL = () => {
    // Save where we came from for state traversal
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    return getStravaOAuthURL(from)
  }
  _resumeAuthFlow = () => {
    // Extract auth code & state traversal from URL
    const { code, state } = qsDecode(this.props.location.search)
    if (!state || !code) {
      return
    }
    // Extract previous location from state traversal
    const from = decodeStateTraversal(state)
    this.setState({ from })
    setTimeout(() => this.setState({ loading: true }), 200)

    this.props
      .loginWithCode({
        variables: {
          code
        }
      })
      .then(({ data }) => {
        auth.authenticate(data.jwt)
        this.setState({
          loading: false,
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

export default withGraphQL(withRouter(withStyles(styles)(Login)))
