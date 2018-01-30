import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom'

import auth from './lib/auth'
import LandingScreen from './screens/Landing'
import LoginScreen from './screens/Login'
import TravelsListScreen from './screens/TravelsList'
import TravelScreen from './screens/Travel'

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated ? (
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
  }

  render () {
    return (
      <Router>
        <main>
          { /* Public Routes */ }
          <Route exact path='/' component={LandingScreen} />
          <Route path='/login' component={LoginScreen} />

          { /* Authenticated Routes */ }
          <AuthRoute exact path='/travels' component={TravelsListScreen} />
          <AuthRoute path='/travels/:id' component={TravelScreen} />
        </main>
      </Router>
    )
  }
}

export default App
