// @flow

import type { ActivityID, ActivityDetails } from 'lib/types'
import type { Action } from './types'

export const storeActivity = (activity: ActivityDetails): Action => ({
  type: 'STORE_ACTIVITY',
  activity
})
