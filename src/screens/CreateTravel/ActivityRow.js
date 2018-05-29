// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Checkbox from '@material-ui/core/Checkbox'

import type { ActivityID, ActivitySummary } from 'lib/types'

const styles = theme => ({
  avatar: {
    backgroundColor: '#eee'
  }
})

type Props = {
  +classes: Object,
  +activity: ActivitySummary,
  +selected: boolean,
  +onClick: (id: ActivityID) => void
}

class ActivityRow extends React.Component<Props> {
  render() {
    const { classes, activity, selected } = this.props
    const date = new Date(activity.date).toDateString()
    return (
      <ListItem button onClick={this.onClick}>
        <Avatar
          alt={activity.title}
          src={activity.thumbnailUrl}
          className={classes.avatar}
        />
        <ListItemText primary={activity.title} secondary={date} />
        <ListItemSecondaryAction>
          <Checkbox
            onChange={this.onClick}
            checked={selected}
            color="primary"
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  onClick = () => {
    this.props.onClick(this.props.activity.id)
  }
}

export default withStyles(styles)(ActivityRow)
