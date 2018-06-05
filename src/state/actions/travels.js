// @flow

import type { ActivityID, TravelID } from 'lib/types'
import type {
  CreateTravelAction,
  RenameTravelAction,
  DeleteTravelAction
} from './types'
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

export const renameTravel = (
  id: TravelID,
  title: string
): RenameTravelAction => ({
  type: 'RENAME_TRAVEL',
  id,
  title
})

export const deleteTravel = (id: TravelID): DeleteTravelAction => ({
  type: 'DELETE_TRAVEL',
  id
})
