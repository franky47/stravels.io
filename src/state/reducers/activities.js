// @flow

import type { ActivityID, ActivityDetails } from 'lib/types'
import type { Action } from 'state/actions/types'

export type State = { [key: ActivityID]: ActivityDetails }

const initialState: State = {}

const activities = (state: State = initialState, action: Action): State => {
  if (action.type === 'STORE_ACTIVITY') {
    return {
      ...state,
      [action.activity.id]: action.activity
    }
  }
  return state
}

export default activities
