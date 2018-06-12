// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

import { createTravel } from 'state/actions/travels'
import { storeActivity } from 'state/actions/activities'
import type {
  ActivityID,
  ActivitySummary,
  ActivityDetails,
  Travel
} from 'lib/types'

import CreateTravelComponent from './CreateTravelComponent'

// Redux --

const mapStateToProps = state => ({
  activityFilter: (activity: ActivitySummary): boolean => {
    return state.activityFilter[activity.type] || false
  },
  hasActivity: (id: ActivityID): boolean => {
    return state.activities.hasOwnProperty(id)
  }
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  storeActivity: (activity: ActivityDetails) => {
    dispatch(storeActivity(activity))
  },
  createTravel: (activities: Set<ActivityID>) => {
    const action: { +travel: Travel } = createTravel(Array.from(activities))
    dispatch(action)
    const { id } = action.travel
    ownProps.history.replace(`/travels/${id}`)
  }
})

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)

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
        type
        thumbnailUrl(retina: true, size: 100)
        date(tz: "Europe/Paris")
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
      type
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
      before: null // Require head
    }}
    notifyOnNetworkStatusChange // Set `loading` when calling fetchMore
  >
    {({ loading, error, data, client, fetchMore }) => {
      const activities =
        data && data.payload && data.payload.activities
          ? data.payload.activities
          : []
      const hasMore = data && data.payload ? data.payload.hasMore : false
      const loadActivity = (id: ActivityID): Promise<ActivityDetails> => {
        return client
          .query({
            query: getActivityDetailsQuery,
            variables: { id }
          })
          .then(({ data }) => data.activity)
      }
      const loadMore =
        data && (data.payload || {}).hasMore
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
          hasMore={hasMore}
        />
      )
    }}
  </Query>
)

// --

export default withRouter(withRedux(withGraphQL(CreateTravelComponent)))
