// @flow

import * as React from 'react'
import { Redirect } from 'react-router-dom'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'

import Header from './Header'
import MapView from './MapTab/components/MapView'
import Panel from './Panel/Panel'
import { decodePolyline } from 'lib/mapping'
import colors from 'lib/colors'

// Types
import type { Travel, ActivityDetails } from 'lib/types'

// -----------------------------------------------------------------------------

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper
  },
  mapView: {
    flex: 1,
    position: 'relative',
    zIndex: 0
  }
})

type Props = {
  // JSS
  +classes: { [key: string]: string },
  // Redux-injected
  +travel: Travel,
  +activities: Array<ActivityDetails>
}

type State = {
  focusedIndex: number
}

class TravelView extends React.Component<Props, State> {
  state = {
    focusedIndex: -1
  }

  render() {
    const { classes, travel, activities } = this.props
    const { focusedIndex } = this.state
    if (travel === null) {
      return <Redirect to="/" />
    }
    const paths = activities.map(({ id, polyline }, index) => ({
      id,
      path: decodePolyline(polyline),
      color: colors[index % colors.length]
    }))
    return (
      <section className={classes.root + ' screen'}>
        <Header title={travel.title} onEdit={() => {}} />
        <div className={classes.mapView}>
          <MapView
            paths={paths}
            focusedIndex={focusedIndex}
            focusOn={this.focusOn}
          />
        </div>
        <Panel
          travel={travel}
          activities={activities}
          focusedIndex={focusedIndex}
          focusOn={this.focusOn}
          focusOnNext={this.focusOnNext}
          focusOnPrevious={this.focusOnPrevious}
        />
      </section>
    )
  }

  // --

  focusOnNext = () => {
    const numActivities = this.props.activities.length
    this.setState(prevState => {
      if (prevState.focusedIndex >= numActivities - 1) {
        return { focusedIndex: -1 }
      }
      return {
        focusedIndex: prevState.focusedIndex + 1
      }
    })
  }
  focusOnPrevious = () => {
    const numActivities = this.props.activities.length
    this.setState(prevState => {
      if (prevState.focusedIndex <= -1) {
        return { focusedIndex: numActivities - 1 }
      }
      return {
        focusedIndex: prevState.focusedIndex - 1
      }
    })
  }
  focusOn = (index: number) => {
    this.setState({ focusedIndex: index })
  }
}

// Redux --

export default withStyles(styles)(TravelView)
