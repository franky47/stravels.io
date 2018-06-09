// @flow

import React from 'react'
import classNames from 'classnames'
import { Redirect } from 'react-router'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import { qsDecode } from 'lib/utility'
import { decodeStateTraversal, getStravaOAuthURL } from 'lib/login'

import auth from 'lib/auth'

import Logo from 'components/core/Logo'
import LoginButton from './LoginButton'
import poweredByStrava from './poweredByStrava.svg'

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    background: `linear-gradient(125deg, #E2FFE2, #FFEFEA)`
  },
  logo: {
    position: 'absolute',
    top: '40vh',
    transform: 'translateY(-50%)',
    textAlign: 'center'
  },
  title: {
    fontWeight: 300,
    color: 'rgba(0, 0, 0, 0.5)'
  },
  button: {
    position: 'absolute',
    top: '70vh',
    transform: 'translateY(-50%)',
    background: `linear-gradient(125deg, #ff5722, #fc4c02)`
  },
  poweredByStrava: {
    maxHeight: 30,
    marginBottom: theme.spacing.unit
  }
})

type Props = {
  +classes: Object,
  +location: any,
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
      <section className={classNames(classes.root, 'screen')}>
        <div className={classes.logo}>
          <Logo size={80} />
          <Typography
            align="center"
            variant="headline"
            className={classes.title}
          >
            Stravels
          </Typography>
        </div>
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

  _getRequestURL = (): string => {
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

export default withStyles(styles)(Login)
