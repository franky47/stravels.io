// @flow

import type {
  TravelID,
  Travel,
  ActivityID,
  ActivityDetails,
  ActivityFilterItem
} from 'lib/types'

// Action Types ----------------------------------------------------------------

export type CreateTravelAction = {
  +type: 'CREATE_TRAVEL',
  +travel: Travel
}

export type RenameTravelAction = {
  +type: 'RENAME_TRAVEL',
  +id: TravelID,
  +title: string
}

export type DeleteTravelAction = {
  +type: 'DELETE_TRAVEL',
  +id: TravelID
}

export type StoreActivityAction = {
  +type: 'STORE_ACTIVITY',
  +activity: ActivityDetails
}

export type ToggleActivityFilterItem = {
  +type: 'ACTIVITY_FILTER_TOGGLE',
  +item: ActivityFilterItem
}

export type Action =
  | CreateTravelAction
  | RenameTravelAction
  | DeleteTravelAction
  | StoreActivityAction
  | ToggleActivityFilterItem
