// @flow

import React from 'react'
import { connect } from 'react-redux'
// import { graphql } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

import { createTravel } from 'state/actions/travels'
import { storeActivity } from 'state/actions/activities'
import type { ActivityID, ActivityDetails, TravelID } from 'lib/types'

import CreateTravelComponent from './CreateTravelComponent'

// Redux --

const mapStateToProps = state => ({
  activities: Object.values(state.activities),
  hasActivity: (id: ActivityID): boolean => {
    return state.activities.hasOwnProperty(id)
  }
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  storeActivity: (activity: ActivityDetails) => {
    dispatch(storeActivity(activity))
  },
  createTravel: (activities: Set<ActivityID>) => {
    const action = createTravel(Array.from(activities))
    dispatch(action)
    const { id } = action.travel
    ownProps.history.replace(`/travels/${id}`)
  }
})

const withState = connect(mapStateToProps, mapDispatchToProps)

// GraphQL --

const getActivitiesQuery = gql`
  query GetActivities($before: Date) {
    payload: activities(before: $before) {
      hasMore
      cursors {
        oldest
      }
      activities {
        id
        title
        thumbnailUrl(retina: true, size: 100)
        date(tz: "Europe/Paris")
        # distance
        # elevation
      }
    }
  }
`

const getActivityDetailsQuery = gql`
  query GetActivityDetails($id: ID!) {
    activity(id: $id) {
      # Summary (should resolve from cache)
      id
      title
      thumbnailUrl(retina: true, size: 100)
      date(tz: "Europe/Paris")

      # Details
      polyline
      startLatLng
      endLatLng

      # Stats
      distance
      elevation
      movingTime
      averageSpeed
      maxSpeed
    }
  }
`

const withGraphQL = Component => ({ ...props }) => (
  <Query
    query={getActivitiesQuery}
    variables={{
      before: '2018-08-01' // new Date().toISOString() // issue: this makes it re-render/re-query the list
    }}
  >
    {({ loading, error, data, client, fetchMore }) => {
      const activities = loading || error ? [] : data.payload.activities
      const loadActivity = (id: ActivityID): Promise<ActivityDetails> => {
        return client
          .query({
            query: getActivityDetailsQuery,
            variables: { id }
          })
          .then(({ data }) => data.activity)
      }
      const loadMore = (data.payload || {}).hasMore
        ? () =>
            fetchMore({
              variables: {
                before: data.payload.cursors.oldest
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                return {
                  payload: {
                    ...fetchMoreResult.payload,
                    activities: [
                      ...prev.payload.activities,
                      ...fetchMoreResult.payload.activities
                    ]
                  }
                }
              }
            })
        : () => {}
      return (
        <Component
          {...props}
          activities={activities}
          loading={loading}
          loadMore={loadMore}
          loadActivity={loadActivity}
          error={error}
        />
      )
    }}
  </Query>
)

// --

export default withRouter(withState(withGraphQL(CreateTravelComponent)))
