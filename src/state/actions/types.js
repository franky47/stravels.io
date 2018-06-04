// @flow

import type { TravelID, Travel, ActivityID, ActivityDetails } from 'lib/types'

// Action Types ----------------------------------------------------------------

export type Action =
  | { +type: 'CREATE_TRAVEL', +travel: Travel }
  | { +type: 'DELETE_TRAVEL', +id: TravelID }
  | { +type: 'STORE_ACTIVITY', +activity: ActivityDetails }
