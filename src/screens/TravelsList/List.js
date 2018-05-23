// @flow

import React from 'react'
import { Link, withRouter } from 'react-router-dom'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

// Material Icons
import BikeIcon from '@material-ui/icons/DirectionsBike'
import DeleteIcon from '@material-ui/icons/Delete'

import { prettifyDateRange } from 'lib/prettify'
import type { Travel } from 'lib/types'

// -----------------------------------------------------------------------------

type RowItemProps = {
  +match: any,
  +travel: Travel,
  +showDelete: boolean
}

const RowItem = withRouter(({ match, travel, showDelete }: RowItemProps) => {
  const { id, title, startDate, endDate } = travel
  const dateRange = prettifyDateRange(startDate, endDate)
  return (
    <ListItem
      button
      component={({ children, ...props }) => (
        <Link to={`${match.url}/${id}`} {...props}>
          {children}
        </Link>
      )}
    >
      <Avatar>
        <BikeIcon />
      </Avatar>
      <ListItemText primary={title} secondary={dateRange} />

      {showDelete && (
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
})

// -----------------------------------------------------------------------------

const styles = theme => ({
  root: {
    width: '100%',
    userSelect: 'none'
  }
})

type Props = {
  +classes: any,
  +travels: Array<Travel>,
  +editing: boolean
}

const TravelList = ({ classes, travels = [], editing }: Props) => {
  if (travels.length === 0) {
    return null
  }

  return (
    <div className={classes.root}>
      <List>
        {travels.map(travel => (
          <RowItem key={travel.id} travel={travel} showDelete={editing} />
        ))}
      </List>
    </div>
  )
}

export default withStyles(styles)(TravelList)
