// @flow

import type { ActivityID, TravelID } from 'lib/types'
import type { Action } from './types'
import nanoid from 'nanoid'

export const createTravel = (activities: Array<ActivityID>): Action => ({
  type: 'CREATE_TRAVEL',
  travel: {
    id: nanoid(),
    title: 'Unnamed travel',
    activities
  }
})

export const deleteTravel = (id: TravelID): Action => ({
  type: 'DELETE_TRAVEL',
  id
})
