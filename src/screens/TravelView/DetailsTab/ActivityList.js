// @flow

import React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import type { ActivityDetails } from 'lib/types'

// -----------------------------------------------------------------------------

type RowItemProps = {
  +activity: ActivityDetails
}

const RowItem = ({ activity }: RowItemProps) => {
  const { id, title, thumbnailUrl } = activity
  return (
    <ListItem
      button
      component="a"
      href={`https://strava.com/activities/${activity.id}`}
    >
      <Avatar src={thumbnailUrl} />
      <ListItemText primary={title} />
    </ListItem>
  )
}

// -----------------------------------------------------------------------------

const styles = theme => ({
  root: {
    width: '100%',
    userSelect: 'none'
  }
})

type Props = {
  +classes: any,
  +activities: Array<ActivityDetails>
}

const ActivityList = ({ classes, activities = [] }: Props) => {
  if (activities.length === 0) {
    return null
  }

  return (
    <div className={classes.root}>
      <List>
        {activities.map(activity => (
          <RowItem key={activity.id} activity={activity} />
        ))}
      </List>
    </div>
  )
}

export default withStyles(styles)(ActivityList)
