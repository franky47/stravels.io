// @flow

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// Material UI Components
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

// Material Icons
import BikeIcon from '@material-ui/icons/DirectionsBike'
import DeleteIcon from '@material-ui/icons/Delete'

import { prettifyDateRange } from 'lib/prettify'
import type { ActivityDetails, Travel } from 'lib/types'
import type { State as ReduxState } from 'state/types'

type Props = {
  +match: any,
  +travel: Travel,
  +showDelete: boolean,
  // Redux-injected
  +dateRange: string
}

const RowItem = ({ match, travel, showDelete, dateRange }: Props) => {
  const { id, title } = travel
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
}

// Redux --

const mapStateToProps = (state: ReduxState, { travel }: Props): Object => {
  const inTravel = (activity: ActivityDetails): boolean => {
    return travel.activities.includes(activity.id)
  }
  const ascendingDate = (a, b) => (a.date > b.date ? 1 : -1)
  const activities: Array<ActivityDetails> = Object.keys(state.activities)
    .map(id => state.activities[id])
    .filter(inTravel)
    .sort(ascendingDate)

  const startDate = activities[0].date
  const endDate = activities[activities.length - 1].date

  return {
    dateRange: prettifyDateRange(startDate, endDate)
  }
}

const withRedux = connect(mapStateToProps)

// --

export default withRedux(withRouter(RowItem))
