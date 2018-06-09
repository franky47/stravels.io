// @flow

import * as React from 'react'
import { Redirect } from 'react-router-dom'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'

// Components
import Header from './Header'
import MapView from 'components/map/MapView'
import Panel from './Panel/Panel'
import MetaEditor from './MetaEditorContainer'

// Logic
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
  focusedIndex: number,
  editorOpen: boolean
}

class TravelView extends React.Component<Props, State> {
  state = {
    focusedIndex: -1,
    editorOpen: false
  }

  render() {
    const { classes, travel, activities } = this.props
    const { focusedIndex, editorOpen } = this.state
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
        <Header
          title={travel.title}
          onEdit={this.openEditor}
          focused={focusedIndex >= 0}
          onResetFocus={this.resetFocus}
        />
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
        <MetaEditor
          open={editorOpen}
          onClose={this.closeEditor}
          travelId={travel.id}
          title={travel.title}
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
  resetFocus = () => {
    this.focusOn(-1)
  }

  // --

  openEditor = () => {
    this.setState({ editorOpen: true })
  }
  closeEditor = () => {
    this.setState({ editorOpen: false })
  }
}

// Redux --

export default withStyles(styles)(TravelView)
