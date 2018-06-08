// @flow

import type { ActivityStats } from './stats'

export type ActivityID = string
export type TravelID = string

export type Travel = {
  +id: TravelID,
  +title: string,
  +activities: ActivityID[]
}

export type ActivitySummary = {
  +id: ActivityID,
  +title: string,
  +thumbnailUrl: string,
  +date: string,
  +type: string
}

export type ActivityMapping = {
  +startLatLng: string, // encoded
  +endLatLng: string, // encoded
  +polyline: string
}

export type ActivityDetails = ActivitySummary & ActivityStats & ActivityMapping

export type ActivityFilterItem =
  | 'Ride'
  | 'Run'
  | 'Walk'
  | 'Hike'
  | 'Backcountry Ski'
  | 'Nordic Ski'
  | 'Snowshoe'
  | 'Canoe'
  | 'Kayak'
  | 'Handcycle'
  | 'Inline Skate'
