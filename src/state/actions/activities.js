// @flow

import type { ActivityDetails } from 'lib/types'
import type { StoreActivityAction } from './types'

export const storeActivity = (
  activity: ActivityDetails
): StoreActivityAction => ({
  type: 'STORE_ACTIVITY',
  activity
})
