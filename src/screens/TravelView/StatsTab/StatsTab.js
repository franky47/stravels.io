import React from 'react'
import StatItem from './StatItem'

import { computeTotals, computeAverages, computeMaxes } from './stats'
import * as prettify from './prettify'
import type { ActivityStats } from './stats'

import './StatsTab.css'

import fakeData from 'fixtures/summer2.json'

type Props = {
  +activities: Array<ActivityStats>
}

export default ({ activities }: Props) => {
  activities = fakeData
  const totals = computeTotals(activities)
  const averages = computeAverages(activities)
  const maxes = computeMaxes(activities)
  return (
    <section className="stats-tab">
      <div className="row">
        <StatItem
          name="distance"
          value={prettify.distance(totals.distance)}
          unit="km"
        />
        <StatItem
          name="elevation"
          value={prettify.elevation(totals.elevation)}
          unit="m"
        />
        <StatItem
          name="duration"
          value={prettify.duration(totals.movingTime)}
        />
      </div>
      <div className="row">
        <StatItem
          name="avg speed"
          value={prettify.speed(averages.speed)}
          unit="km/h"
        />
        <StatItem
          name="max speed"
          value={prettify.speed(maxes.speed)}
          unit="km/h"
        />
      </div>
    </section>
  )
}
