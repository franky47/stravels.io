import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'

import auth from 'lib/auth'
import createStore from 'state/createStore'
import storage from 'lib/persistentStorage'
import { AuthRoute } from 'lib/routes'
import UpdateNotifier from 'components/core/UpdateNotifier'

// Screens
import HomeScreen from 'screens/Home/Home'
import LoginScreen from 'screens/Login/Login'
import TravelsList from 'screens/TravelsList/TravelsList'
import TravelView from 'screens/TravelView/TravelView'
import CreateTravel from 'screens/CreateTravel/CreateTravel'

import Theme from 'theme'
import 'App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    auth.init()
    storage.hydrate()
    this.state = {
      updateAvailable: false
    }

    this.props.serviceWorkerEvents.on('updateAvailable', () => {
      this.setState({
        updateAvailable: true
      })
    })
    this.store = createStore()
  }

  render() {
    return (
      <StoreProvider store={this.store}>
        <Router>
          <React.Fragment>
            <CssBaseline />
            <Theme>
              <React.Fragment>
                {/* Public Routes */}
                <Route path="/login" component={LoginScreen} />

                {/* Authenticated Routes */}
                <Switch>
                  <AuthRoute exact path="/" component={HomeScreen} />
                  <AuthRoute exact path="/travels" component={TravelsList} />
                  <AuthRoute
                    exact
                    path="/travels/create"
                    component={CreateTravel}
                  />
                  <AuthRoute path="/travels/:id" component={TravelView} />
                </Switch>

                {this.state.updateAvailable && <UpdateNotifier />}
              </React.Fragment>
            </Theme>
          </React.Fragment>
        </Router>
      </StoreProvider>
    )
  }
}

export default App
