import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { reauthenticate } from './graphql'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

import auth from 'lib/auth'
import createStore from 'state/createStore'
import { AuthRoute } from 'lib/routes'
import UpdateNotifier from 'components/core/UpdateNotifier'

// Screens
import LoginScreen from 'screens/Login/LoginContainer'
import TravelsList from 'screens/TravelsList/TravelsList'
import TravelView from 'screens/TravelView/TravelViewContainer'
import CreateTravel from 'screens/CreateTravel/CreateTravelContainer'

// Material UI Theming
import CssBaseline from '@material-ui/core/CssBaseline'
import Theme from 'theme'
// import 'App.css'

class App extends React.Component {
  state = {
    updateAvailable: false
  }

  constructor(props) {
    super(props)
    // window.serviceWorkerEvents = this.props.serviceWorkerEvents
    auth.init()
    if (auth.hasExpired) {
      reauthenticate(this.props.client)
    }

    this.props.serviceWorkerEvents.on('updateAvailable', () => {
      this.setState({
        updateAvailable: true
      })
    })
    // Redux & Persistence
    const { store, persistor } = createStore()
    this.store = store
    this.storePersistor = persistor
  }

  render() {
    return (
      <StoreProvider store={this.store}>
        <PersistGate
          loading={<p>Loading...</p>}
          persistor={this.storePersistor}
        >
          <Router>
            <React.Fragment>
              <CssBaseline />
              <Theme>
                <Route render={this.renderRoutes} />
              </Theme>
            </React.Fragment>
          </Router>
        </PersistGate>
      </StoreProvider>
    )
  }

  renderRoutes = ({ location }) => {
    const { updateAvailable } = this.state
    return (
      <React.Fragment>
        {/* <TransitionGroup component={null}>
          <CSSTransition classNames="screen" key={location.key} timeout={400}> */}
        <Switch location={location}>
          <Route
            exact
            path="/"
            render={() => <TravelsList moveFabUp={updateAvailable} />}
          />
          <Route exact path="/login" component={LoginScreen} />
          <AuthRoute exact path="/create" component={CreateTravel} />
          <Route path="/travels/:id" component={TravelView} />
        </Switch>
        {/* </CSSTransition>
        </TransitionGroup> */}
        <UpdateNotifier open={updateAvailable} />
      </React.Fragment>
    )
  }
}

export default App
