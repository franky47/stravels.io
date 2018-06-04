// @flow

import type { TravelID, Travel } from 'lib/types'
import type { Action } from 'state/actions/types'

export type State = { [key: TravelID]: Travel }

const initialState: State = {}

export default (state: State = initialState, action: Action): State => {
  if (action.type === 'CREATE_TRAVEL') {
    const { travel } = action
    return {
      ...state,
      [travel.id]: travel
    }
  }
  if (action.type === 'DELETE_TRAVEL') {
    // Use rest operator to copy all but the key we want gone:
    const { id } = action
    const { [id]: _, ...rest } = state
    return rest
  }
  return state
}
