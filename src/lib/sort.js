// @flow

type DatedObject = {
  +date: string // ISO-8601
}
type SortingDirection = -1 | 0 | 1

// --

export const byDateMostRecentFirst = (
  a: DatedObject,
  b: DatedObject
): SortingDirection => {
  if (a.date === b.date) {
    return 0
  }
  return a.date < b.date ? 1 : -1
}

export const byDateChronological = (
  a: DatedObject,
  b: DatedObject
): SortingDirection => {
  if (a.date === b.date) {
    return 0
  }
  return a.date > b.date ? 1 : -1
}
