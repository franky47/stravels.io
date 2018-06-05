// @flow

import type { State as TravelState } from './reducers/travels'
import type { State as ActivityState } from './reducers/activities'
import type { State as ActivityFilterState } from './reducers/activityFilter'

export type State = {
  +travels: TravelState,
  +activities: ActivityState,
  +activityFilter: ActivityFilterState
}
