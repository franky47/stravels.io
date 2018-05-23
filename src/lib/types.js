// @flow

export type ActivityID = string

export type Travel = {
  id: string,
  title: string,
  startDate: Date | string,
  endDate: Date | string,
  activities: Array<ActivityID>
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
