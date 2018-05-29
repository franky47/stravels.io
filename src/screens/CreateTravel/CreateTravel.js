// @flow

import React from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'

import Header from './Header'
import Footer from './Footer'
import ActivityPicker from './ActivityPicker'
import { createTravel } from 'state/actions/travels'
import type { ActivityID, ActivityDetails } from 'lib/types'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default
  },
  scroll: {
    flex: 1,
    overflow: 'scroll',
    paddingBottom: 72
  }
})

type Props = {
  +classes: any,
  // GraphQL-injected
  +data: any,
  // Redux-injected
  +activities: Array<ActivityDetails>,
  +createTravel: (activities: Set<ActivityID>) => void
}
type State = {
  selectedActivities: Set<ActivityID>
}

class CreateTravel extends React.Component<Props, State> {
  state = {
    selectedActivities: new Set()
  }

  render() {
    const { classes, data, activities } = this.props
    const { selectedActivities } = this.state

    // let activities = []
    // if (!data.error && !data.loading) {
    //   activities = data.payload.activities
    // }

    return (
      <section className={classes.root}>
        <Header />
        <div className={classes.scroll}>
          <ActivityPicker
            activities={activities}
            selected={selectedActivities}
            onItemSelect={this.onActivitySelect}
          />
        </div>
        <Slide
          direction="up"
          in={selectedActivities.size > 0}
          mountOnEnter
          unmountOnExit
        >
          <Footer
            selectedActivities={selectedActivities}
            onCreate={this.onCreate}
          />
        </Slide>
      </section>
    )
  }

  // --

  onActivitySelect = (id: ActivityID) => {
    const handleToggle = (set: Set<ActivityID>): Set<ActivityID> => {
      const copy = new Set(Array.from(set))
      if (copy.has(id)) {
        copy.delete(id)
      } else {
        copy.add(id)
      }
      return copy
    }
    this.setState(prevState => ({
      selectedActivities: handleToggle(prevState.selectedActivities)
    }))
  }

  // --

  onCreate = () => {
    console.warn('todo: Make sure everything is ready in state')
    this.props.createTravel(this.state.selectedActivities)
  }
}

// GraphQL --

// const query = gql`
//   query GetActivities($before: Date) {
//     payload: activities(before: $before) {
//       hasMore
//       cursors {
//         oldest
//       }
//       activities {
//         id
//         title
//         thumbnailUrl(retina: true, size: 100)
//         date(tz: "Europe/Paris")
//         distance
//         elevation
//       }
//     }
//   }
// `

// const withGraphQL = graphql(query, {
//   props({ data }) {
//     const { payload, fetchMore } = data
//     return {
//       data,
//       loadNextPage() {
//         return fetchMore({
//           variables: {
//             before: payload.cursors.oldest
//           },
//           updateQuery: (previousResult, { fetchMoreResult }) => {
//             if (!fetchMoreResult) {
//               return previousResult
//             }
//             return {
//               payload: {
//                 ...fetchMoreResult.payload,
//                 activities: [
//                   ...previousResult.payload.activities,
//                   ...fetchMoreResult.payload.activities
//                 ]
//               }
//             }
//           }
//         })
//       }
//     }
//   },
//   options: {
//     // https://github.com/apollographql/react-apollo/issues/727
//     // https://github.com/apollographql/apollo-client/issues/1617
//     notifyOnNetworkStatusChange: true
//   }
// })

// Redux --

const mapStateToProps = state => ({
  activities: Object.values(state.activities)
})
const mapDispatchToProps = dispatch => ({
  createTravel: (activities: Set<ActivityID>) =>
    dispatch(createTravel(Array.from(activities)))
})

const withState = connect(mapStateToProps, mapDispatchToProps)

export default withState(withStyles(styles)(CreateTravel))
