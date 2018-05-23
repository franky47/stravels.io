// @flow

import type { Travel, ActivityDetails } from 'lib/types'

// Fake data
import summer1 from 'fixtures/summer1.json'
import summer2 from 'fixtures/summer2.json'
import acbt from 'fixtures/acbt.json'

type TravelMap = Map<string, Travel>
type ActivityMap = Map<string, ActivityDetails>

// -----------------------------------------------------------------------------

const travels: TravelMap = new Map([
  [
    'foo',
    {
      id: 'foo',
      title: 'Summer 2017 Bike Trip Part 2',
      startDate: '2017-08-12T08:45:37Z',
      endDate: '2017-08-15T06:47:09Z',
      activities: summer2.map(a => a.id)
    }
  ],
  [
    'bar',
    {
      id: 'bar',
      title: 'Summer 2017 Bike Trip Part 1',
      startDate: '2017-07-29T10:40:29Z',
      endDate: '2017-08-07T08:38:56Z',
      activities: summer1.map(a => a.id)
    }
  ],
  [
    'egg',
    {
      id: 'egg',
      title: 'Atlantic Coast - Nantes to Bordeaux',
      startDate: '2017-06-29T10:40:29Z',
      endDate: '2017-06-07T08:38:56Z',
      activities: acbt.map(a => a.id)
    }
  ]
])

// -----------------------------------------------------------------------------

const activities: ActivityMap = new Map([
  ...summer1.map(a => [a.id, a]),
  ...summer2.map(a => [a.id, a]),
  ...acbt.map(a => [a.id, a])
])

// -----------------------------------------------------------------------------

const makeStorageKey = name => `ps://${name}`

const persist = () => {
  const persistMap = (name: string, map: Map<string, any>) => {
    const data = Array.from(map.entries())
    localStorage.setItem(makeStorageKey(name), JSON.stringify(data))
  }
  persistMap('travels', travels)
  persistMap('activities', activities)
}

const hydrate = () => {
  const hydrateMap = (name: string, map: Map<string, any>) => {
    try {
      const data = JSON.parse(
        localStorage.getItem(makeStorageKey(name)) || '[]'
      )
      data.forEach(([key, val]) => {
        map.set(key, val)
      })
    } catch (_) {}
  }
  hydrateMap('travels', travels)
  hydrateMap('activities', activities)
}

// -----------------------------------------------------------------------------

export default {
  travels,
  activities,

  // --

  persist,
  hydrate
}
