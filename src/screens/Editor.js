import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loadable from 'react-loadable'

// Components
import ActivityList from '../components/ActivityList'
import Spinner from '../components/Spinner'
import RoR from '../components/RefreshOrRedirect'

import './Editor.css'

const LoadableMap = Loadable({
  loader: () => import('../components/Map'),
  loading ({ error, pastDelay }) {
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (pastDelay) {
      return <Spinner />
    } else {
      return null
    }
  }
})

class Editor extends React.Component {
  state = {
    selected: new Set()
  }

  render () {
    let activities = []
    if (!this.props.error) {
      activities = this.props.data.payload.activities
    }

    activities = activities
      .map(a => ({ ...a, selected: this.state.selected.has(a.id) }))

    const polylines = activities
      .filter(a => a.selected)
      .reduce((acc, a) => ({
        ...acc,
        [a.id]: a.polyline
      }), {})

    return (
      <div className='editor'>
        <ActivityList
          items={activities}
          onItemSelect={this._onItemSelect}
          loading={this.props.data.loading}
          onLoadMore={this.props.loadNextPage}
          hasMore={this.props.data.payload.hasMore}
        />
        <LoadableMap polylines={polylines} />
      </div>
    )
  }

  _onItemSelect = (id) => {
    const selected = new Set([...this.state.selected]) // Make a copy
    if (selected.has(id)) {
      selected.delete(id)
    } else {
      selected.add(id)
    }
    this.setState({
      selected
    })
  }
}

const query = gql`
query GetActivities($before: Date) {
  payload: activities(before: $before) {
    hasMore
    cursors {
      oldest
    }
    activities {
      id
      title
      distance(unit: KILOMETERS)
      date(tz: "Europe/Paris")
      thumbnailUrl(retina: true, size: 70)
      elevation
      polyline
    }
  }
}
`

const withGraphQL = graphql(query, {
  props ({ data }) {
    const { payload, fetchMore } = data
    return {
      data,
      loadNextPage () {
        return fetchMore({
          variables: {
            before: payload.cursors.oldest
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return {
              payload: {
                ...fetchMoreResult.payload,
                activities: [
                  ...previousResult.payload.activities,
                  ...fetchMoreResult.payload.activities
                ]
              }
            }
          }
        })
      }
    }
  },
  options: {
    // https://github.com/apollographql/react-apollo/issues/727
    // https://github.com/apollographql/apollo-client/issues/1617
    notifyOnNetworkStatusChange: true
  }
})

export default withGraphQL(RoR(Editor))
