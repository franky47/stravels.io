// @flow

import type { State } from './types'
import type { ActivityID, ActivitySummary, TravelID, Travel } from 'lib/types'

export const getMostRecentActivity = (
  state: State,
  ids: Array<ActivityID>
): ?ActivitySummary => {
  const activities = Object.values(state.activities).filter(
    (a: ActivitySummary) => ids.includes(a.id)
  )
  return activities.sort((a: ActivitySummary, b: ActivitySummary) => {
    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0 // Sort most recent first
  })[0] // Keep first
}

// --

export const getTravelsRevChronoOrder = (state: State): Array<Travel> => {
  // Internal type
  type TravelDateTuple = {
    id: TravelID,
    date: string
  }

  const travelDateTupleArray: Array<TravelDateTuple> = Object.values(
    state.travels
  ).map((travel: Travel) => {
    const lastDate = getMostRecentActivity(state, travel.activities).date
    return {
      id: travel.id,
      date: lastDate
    }
  })
  return travelDateTupleArray
    .sort((a, b) => (a.date <= b.date ? 1 : -1))
    .map(tuple => state.travels[tuple.id])
}
