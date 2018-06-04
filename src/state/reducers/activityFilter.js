// @flow

import type { ActivityFilterItem } from 'lib/types'
import type { Action } from 'state/actions/types'

export type State = { [key: ActivityFilterItem]: boolean }

const initialState: State = {
  Ride: true,
  Run: false,
  Walk: false,
  Hike: true,
  'Backcountry Ski': false,
  'Nordic Ski': false,
  Snowshoe: false,
  Canoe: false,
  Kayak: false,
  Handcycle: true,
  'Inline Skate': false
}

const activityFilter = (state: State = initialState, action: Action): State => {
  if (action.type === 'ACTIVITY_FILTER_TOGGLE') {
    const { item } = action
    return {
      ...state,
      [item]: !state[item]
    }
  }
  return state
}

export default activityFilter
