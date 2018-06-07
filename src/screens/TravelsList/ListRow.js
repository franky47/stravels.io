// @flow

import React from 'react'
import { Link } from 'react-router-dom'
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
import { byDateChronological } from 'lib/sort'
import { deleteTravel } from 'state/actions/travels'
import type { ActivityDetails, TravelID, Travel } from 'lib/types'
import type { State as ReduxState } from 'state/types'

type Props = {
  +travel: Travel,
  +showDelete: boolean,
  // Redux-injected
  +dateRange: string,
  +deleteTravel: (id: TravelID) => void
}

class RowItem extends React.Component<Props> {
  render() {
    const { travel, dateRange, showDelete } = this.props
    const { id, title } = travel

    return (
      <ListItem
        button
        component={({ children, ...props }) => (
          <Link to={`/travels/${id}`} {...props}>
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
            <IconButton aria-label="Delete" onClick={this._deleteTravel}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    )
  }
  _deleteTravel = () => {
    this.props.deleteTravel(this.props.travel.id)
  }
}

// Redux --

const mapStateToProps = (state: ReduxState, { travel }: Props): Object => {
  const inTravel = (activity: ActivityDetails): boolean => {
    return travel.activities.includes(activity.id)
  }
  const activities: Array<ActivityDetails> = Object.keys(state.activities)
    .map(id => state.activities[id])
    .filter(inTravel)
    .sort(byDateChronological)
  const startDate = activities[0].date
  const endDate = activities[activities.length - 1].date
  return {
    dateRange: prettifyDateRange(startDate, endDate)
  }
}

const mapDispatchToProps = dispatch => ({
  deleteTravel: (id: TravelID) => dispatch(deleteTravel(id))
})

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)

// --

export default withRedux(RowItem)
