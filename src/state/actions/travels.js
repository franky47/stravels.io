// @flow

import type { ActivityID, TravelID } from 'lib/types'
import type { CreateTravelAction, DeleteTravelAction } from './types'
import nanoid from 'nanoid'

export const createTravel = (
  activities: Array<ActivityID>
): CreateTravelAction => ({
  type: 'CREATE_TRAVEL',
  travel: {
    id: nanoid(),
    title: 'Unnamed travel',
    activities
  }
})

export const deleteTravel = (id: TravelID): DeleteTravelAction => ({
  type: 'DELETE_TRAVEL',
  id
})
