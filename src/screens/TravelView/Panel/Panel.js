// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

// Components
import TravelBar from './TravelBar'
import Navigation from './Navigation'
import Stats from './Stats'

// Logic
import colors from 'lib/colors'
import * as stats from 'lib/stats'
import * as prettify from 'lib/prettify'

// Types
import type { Travel, ActivityDetails } from 'lib/types'

const styles = theme => ({
  root: {
    position: 'relative',
    zIndex: 5000
  }
})

type Props = {
  +classes: { [key: string]: string },
  +travel: Travel,
  +activities: ActivityDetails[],
  +focusedIndex: number,
  +focusOn: (index: number) => void,
  +focusOnNext: () => void,
  +focusOnPrevious: () => void
}

const Panel = ({
  classes,
  travel,
  activities,
  focusedIndex,
  focusOn,
  focusOnNext,
  focusOnPrevious
}: Props) => {
  const focus = focusedIndex >= 0
  const title = focus ? activities[focusedIndex].title : travel.title
  const startDate = activities[0].date
  const endDate = activities[activities.length - 1].date
  const date = focus
    ? prettify.dateRange(
        activities[focusedIndex].date,
        activities[focusedIndex].date
      )
    : prettify.dateRange(startDate, endDate)

  const sections = activities.map(({ distance }, index) => ({
    distance,
    color: colors[index % colors.length]
  }))

  // Stats --
  // $FlowFixMe
  const totals = stats.computeTotals(activities)
  const distance = prettify.distanceAsKm(
    focus ? activities[focusedIndex].distance : totals.distance
  )
  const elevation = prettify.elevation(
    focus ? activities[focusedIndex].elevation : totals.elevation
  )
  const movingTime = prettify.duration(
    focus ? activities[focusedIndex].movingTime : totals.movingTime
  )

  return (
    <Paper elevation={4} className={classes.root}>
      <TravelBar
        sections={sections}
        focusedIndex={focusedIndex}
        focusOn={focusOn}
      />
      <Navigation
        title={title}
        date={date}
        onNext={focusOnNext}
        onPrevious={focusOnPrevious}
        zoomOutPrevious={focusedIndex === 0}
        zoomOutNext={focusedIndex === activities.length - 1}
      />
      <Stats
        distance={distance}
        elevation={elevation}
        movingTime={movingTime}
      />
    </Paper>
  )
}

export default withStyles(styles)(Panel)
