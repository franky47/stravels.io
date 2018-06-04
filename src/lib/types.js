// @flow

export type ActivityID = string
export type TravelID = string

export type Travel = {
  +id: TravelID,
  +title: string,
  +activities: Array<ActivityID>
  // startDate: Date | string,
  // endDate: Date | string
}

export type ActivitySummary = {
  +id: ActivityID,
  +title: string,
  +thumbnailUrl: string,
  +date: string,
  +distance: number,
  +elevation: number
}

export type ActivityDetails = {
  +id: ActivityID,
  +title: string,
  +date: string,
  +distance: number,
  +elevation: number,
  +startLatLng: string, // encoded
  +endLatLng: string, // encoded
  +thumbnailUrl: string,
  +polyline: string,
  +maxSpeed: number, // m/s
  +averageSpeed: number, // m/s
  +movingTime: number // seconds
}

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
