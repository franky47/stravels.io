// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Button from '@material-ui/core/Button'

import ActivityRow from './ActivityRow'
import LoadingSpinner from 'components/core/LoadingSpinner'
import { byDateMostRecentFirst } from 'lib/sort'

import type { ActivityID, ActivitySummary } from 'lib/types'

const styles = theme => ({
  root: {
    position: 'relative'
  },
  filter: {
    float: 'right',
    marginRight: -12
  },
  spinnerHead: {
    position: 'absolute',
    top: theme.spacing.unit * 2,
    left: 'calc(50% - 18px)',
    zIndex: 10000
  },
  spinnerTail: {
    margin: '1em auto'
  },
  loadMoreButton: {
    display: 'block',
    margin: '0 auto'
  }
})

type Props = {
  classes: any,
  +activities: Array<ActivitySummary>,
  +selected: Set<ActivityID>,
  +loadingHead: boolean,
  +loadingTail: boolean,
  +hasMore: boolean,
  +onLoadMore: () => void,
  +onItemSelect: (id: ActivityID) => void
}

const ActivityPicker = ({
  classes,
  activities,
  selected,
  onItemSelect,
  onLoadMore,
  loadingHead,
  loadingTail,
  hasMore
}: Props) => {
  const showLoadMoreButton = !loadingTail && hasMore && activities.length > 0
  return (
    <List
      className={classes.root}
      subheader={<ListSubheader disableSticky>Select activities</ListSubheader>}
    >
      <LoadingSpinner className={classes.spinnerHead} active={loadingHead} />
      {activities
        .slice() // make a copy as sort is in-place
        .sort(byDateMostRecentFirst)
        .map(activity => (
          <ActivityRow
            key={activity.id}
            activity={activity}
            onClick={onItemSelect}
            selected={selected.has(activity.id)}
          />
        ))}
      {showLoadMoreButton && (
        <Button onClick={onLoadMore} className={classes.loadMoreButton}>
          Load more
        </Button>
      )}
      <LoadingSpinner className={classes.spinnerTail} active={loadingTail} />
    </List>
  )
}

export default withStyles(styles)(ActivityPicker)
