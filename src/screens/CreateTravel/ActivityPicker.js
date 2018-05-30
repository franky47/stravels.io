// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import ActivityRow from './ActivityRow'

import type { ActivityID, ActivitySummary } from 'lib/types'

const styles = theme => ({
  root: {},
  filter: {
    float: 'right',
    marginRight: -12
  }
})

type Props = {
  classes: any,
  +activities: Array<ActivitySummary>,
  +selected: Set<ActivityID>,
  onItemSelect: (id: ActivityID) => void
}

const mostRecentFirst = (a, b) => (a.date < b.date ? 1 : -1)

const ActivityPicker = ({
  classes,
  activities,
  selected,
  onItemSelect
}: Props) => (
  <List
    className={classes.root}
    subheader={<ListSubheader disableSticky>Select activities</ListSubheader>}
  >
    {activities
      .sort(mostRecentFirst)
      .map(activity => (
        <ActivityRow
          key={activity.id}
          activity={activity}
          onClick={onItemSelect}
          selected={selected.has(activity.id)}
        />
      ))}
  </List>
)

export default withStyles(styles)(ActivityPicker)
