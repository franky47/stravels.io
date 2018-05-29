// @flow

import type { TravelID, Travel, ActivityID, ActivityDetails } from 'lib/types'

export type State = {
  +version: number,
  +travels: Array<Travel>,
  +activities: Array<ActivityDetails>
}

// Action Types ----------------------------------------------------------------

export type Action =
  | { +type: 'CREATE_TRAVEL', +travel: Travel }
  | { +type: 'DELETE_TRAVEL', +id: TravelID }
  | { +type: 'STORE_ACTIVITY', +activity: ActivityDetails }
