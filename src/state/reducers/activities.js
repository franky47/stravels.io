// @flow

import type { ActivityID, ActivityDetails } from 'lib/types'
import type { Action } from '../actions/types'

export type ActivityMap = { [key: ActivityID]: ActivityDetails }

const initialState: ActivityMap = {}

const activities = (
  state: ActivityMap = initialState,
  action: Action
): ActivityMap => {
  if (action.type === 'STORE_ACTIVITY') {
    return {
      ...state,
      [action.activity.id]: action.activity
    }
  }
  return state
}

export default activities
