// @flow

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { byDateChronological } from 'lib/sort'

// Types
import type { TravelID, ActivityID, ActivityDetails } from 'lib/types'
import type { State as ReduxState } from 'state/types'

import TravelView from './TravelViewComponent'

// Redux --

type Props = {
  +match: {
    +params: {
      +id: TravelID
    }
  }
}

const mapStateToProps = (state: ReduxState, { match }: Props): Object => {
  const { id } = match.params
  const travel = state.travels[id] || null
  if (!travel) {
    return {
      travel: null,
      activities: []
    }
  }
  const activities = travel.activities
    .map((id: ActivityID): ActivityDetails => state.activities[id])
    .sort(byDateChronological)
  return {
    travel,
    activities
  }
}

const withRedux = connect(mapStateToProps)

// --

export default withRouter(withRedux(TravelView))
