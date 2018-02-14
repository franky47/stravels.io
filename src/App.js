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
import ActivitiesScreen from './screens/Activities'
import UpdateNotifier from './components/UpdateNotifier'
// import Header from './components/Header'
import Editor from './screens/Editor'

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
          {/* <Header /> */}
          { this.state.updateAvailable && <UpdateNotifier /> }

          { /* Public Routes */ }
          <Route exact path='/' component={LandingScreen} />
          <Route path='/login' component={LoginScreen} />

          { /* Authenticated Routes */ }
          <AuthRoute exact path='/editor' component={Editor} />
          <AuthRoute exact path='/travels' component={TravelsListScreen} />
          <AuthRoute exact path='/activities' component={ActivitiesScreen} />
          <AuthRoute path='/travels/:id' component={TravelScreen} />
        </main>
      </Router>
    )
  }
}

export default App
