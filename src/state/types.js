// @flow

import type { TravelMap } from './reducers/travels'
import type { ActivityMap } from './reducers/activities'

export type State = {
  +travels: TravelMap,
  +activities: ActivityMap
}
