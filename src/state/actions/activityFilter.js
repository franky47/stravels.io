// @flow

import type { ActivityFilterItem } from 'lib/types'
import type { ToggleActivityFilterItem } from './types'

export const toggleActivityFilterItem = (
  item: ActivityFilterItem
): ToggleActivityFilterItem => ({
  type: 'ACTIVITY_FILTER_TOGGLE',
  item
})
