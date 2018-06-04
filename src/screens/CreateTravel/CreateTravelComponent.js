// @flow

import React from 'react'
import classNames from 'classnames'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'

import Header from './Header'
import Footer from './Footer'
import ActivityFilter from './ActivityFilterContainer'
import ActivityPicker from './ActivityPicker'
import type {
  ActivityID,
  ActivitySummary,
  ActivityDetails,
  TravelID
} from 'lib/types'

const styles = theme => ({
  root: {
    // opacity: 0.5,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    overflow: 'hidden',
    // position: 'relative',
    backgroundColor: theme.palette.background.default
  },
  scroll: {
    flex: 1,
    overflow: 'scroll'
    // paddingBottom: 72
  }
})

type Props = {
  +classes: any,
  // GraphQL-injected
  +activities: Array<ActivitySummary>,
  +loadMore: () => void,
  +loadActivity: (id: ActivityID) => Promise<ActivityDetails>,
  +loading: boolean,
  +error: any,
  // Redux-injected
  +hasActivity: (id: ActivityID) => boolean,
  +storeActivity: (activity: ActivityDetails) => void,
  +createTravel: (activities: Set<ActivityID>) => void
}

type State = {
  selectedActivities: Set<ActivityID>,
  filterDialogOpen: boolean
}

class CreateTravel extends React.Component<Props, State> {
  state = {
    selectedActivities: new Set(),
    filterDialogOpen: true
  }

  render() {
    const { classes, activities, loadMore, loading, error } = this.props
    const { selectedActivities, filterDialogOpen } = this.state
    const loadingHead = loading && activities.length === 0
    const loadingTail = loading && activities.length > 0

    return (
      <section className={classNames(classes.root, 'screen')}>
        <ActivityFilter
          open={filterDialogOpen}
          onClose={this.hideFilterDialog}
        />
        <Header onFilter={this.showFilterDialog} />
        <div className={classes.scroll}>
          <ActivityPicker
            activities={activities}
            selected={selectedActivities}
            onItemSelect={this.onActivitySelect}
            loadingHead={loadingHead}
            loadingTail={loadingTail}
            onLoadMore={loadMore}
          />
        </div>
        <Slide
          direction="up"
          in={selectedActivities.size > 0}
          mountOnEnter
          unmountOnExit
        >
          <Footer
            selectedActivities={selectedActivities}
            onCreate={this.onCreate}
          />
        </Slide>
      </section>
    )
  }

  // --

  onActivitySelect = (id: ActivityID) => {
    const handleToggle = (set: Set<ActivityID>): Set<ActivityID> => {
      const copy = new Set(Array.from(set))
      if (copy.has(id)) {
        copy.delete(id)
      } else {
        copy.add(id)
      }
      return copy
    }
    this.setState(prevState => ({
      selectedActivities: handleToggle(prevState.selectedActivities)
    }))
    // Load activity details
    const { hasActivity, loadActivity, storeActivity } = this.props
    if (!hasActivity(id)) {
      loadActivity(id).then(storeActivity)
    }
  }

  // --

  onCreate = () => {
    this.props.createTravel(this.state.selectedActivities)
  }

  // --

  showFilterDialog = () => {
    this.setState({ filterDialogOpen: true })
  }
  hideFilterDialog = () => {
    this.setState({ filterDialogOpen: false })
  }
}

export default withStyles(styles)(CreateTravel)
