// @flow

import type { State as TravelState } from './reducers/travels'
import type { State as ActivityState } from './reducers/activities'

export type State = {
  +travels: TravelState,
  +activities: ActivityState
}
