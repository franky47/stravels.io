// @flow

import * as React from 'react'
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

// Icons
import MapIcon from '@material-ui/icons/Map'
import StatsIcon from '@material-ui/icons/Timeline'
import DetailsIcon from '@material-ui/icons/Info'
import BackIcon from '@material-ui/icons/ArrowBack'

// Tab Views
import MapTab from './MapTab/MapTab'
import StatsTab from './StatsTab/StatsTab'
import DetailsTab from './DetailsTab/DetailsTab'

// Types
import type { TravelID, Travel, ActivityID, ActivityDetails } from 'lib/types'
import type { State as ReduxState } from 'state/types'

// -----------------------------------------------------------------------------

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20
  },
  flex: {
    flex: 1
  },
  // editIcon: {
  //   marginRight: -12
  // },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
})

type Props = {
  // JSS
  +classes: any,
  // Router
  +match: Object,
  +history: Object,

  +travel: Travel,
  +activities: Array<ActivityDetails>
}

class TravelView extends React.Component<Props> {
  handleTabChange = (event, url) => {
    this.props.history.replace(url)
  }

  render() {
    const { classes, match, history, travel, activities } = this.props
    if (travel === null) {
      return <Redirect to="/" />
    }

    return (
      <section className={classes.root + ' screen'}>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <IconButton
              className={classes.backButton}
              color="inherit"
              aria-label="Back"
              component={Link}
              to="/"
              replace
            >
              <BackIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              noWrap
              className={classes.flex}
            >
              {travel.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route
            path={match.url}
            exact
            render={props => (
              <MapTab {...props} activities={activities} travel={travel} />
            )}
          />
          <Route
            path={match.url + '/stats'}
            render={props => (
              <StatsTab {...props} activities={activities} travel={travel} />
            )}
          />
          <Route
            path={match.url + '/details'}
            render={props => (
              <DetailsTab {...props} activities={activities} travel={travel} />
            )}
          />
        </Switch>

        <BottomNavigation
          value={history.location.pathname}
          onChange={this.handleTabChange}
          showLabels
          className={classes.bottomNav}
        >
          <BottomNavigationAction
            label="Map"
            icon={<MapIcon />}
            value={match.url}
          />
          <BottomNavigationAction
            label="Stats"
            icon={<StatsIcon />}
            value={match.url + '/stats'}
          />
          <BottomNavigationAction
            label="Details"
            icon={<DetailsIcon />}
            value={match.url + '/details'}
          />
        </BottomNavigation>
      </section>
    )
  }
}

// Redux --

const mapStateToProps = (state: ReduxState, { match }: Props): Object => {
  const id: TravelID = match.params.id
  const travel = state.travels[id] || null
  if (!travel) {
    return {
      travel: null,
      activities: []
    }
  }
  const ascendingDate = (a, b) => (a.date > b.date ? 1 : -1)
  const activities = travel.activities
    .map((id: ActivityID): ActivityDetails => state.activities[id])
    .sort(ascendingDate)
  return {
    travel,
    activities
  }
}

const withRedux = connect(mapStateToProps)

// --

export default withRouter(withRedux(withStyles(styles)(TravelView)))
