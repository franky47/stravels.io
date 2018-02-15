import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom'

import auth from './lib/auth'
import LandingScreen from './screens/Landing'
import LoginScreen from './screens/Login'
import Editor from './screens/Editor'
import UpdateNotifier from './components/UpdateNotifier'

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.authenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
)

class App extends React.Component {
  constructor (props) {
    super(props)
    auth.init()
    this.state = {
      updateAvailable: false
    }

    this.props.serviceWorkerEvents.on('updateAvailable', () => {
      this.setState({
        updateAvailable: true
      })
    })
  }

  render () {
    return (
      <Router>
        <main>
          { this.state.updateAvailable && <UpdateNotifier /> }

          { /* Public Routes */ }
          <Route exact path='/' component={LandingScreen} />
          <Route path='/login' component={LoginScreen} />

          { /* Authenticated Routes */ }
          <AuthRoute exact path='/editor' component={Editor} />
        </main>
      </Router>
    )
  }
}

export default App
