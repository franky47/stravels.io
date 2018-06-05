// @flow

import { connect } from 'react-redux'
import { toggleActivityFilterItem } from 'state/actions/activityFilter'

import type { ActivityFilterItem } from 'lib/types'
import type { State } from 'state/types'

import ActivityFilter from './ActivityFilterComponent'

// Redux --

const mapStateToProps = (state: State) => ({
  items: state.activityFilter
})

const mapDispatchToProps = dispatch => ({
  toggleActivityFilterItem: (item: ActivityFilterItem) => {
    dispatch(toggleActivityFilterItem(item))
  }
})

const withRedux = connect(mapStateToProps, mapDispatchToProps)

// --

export default withRedux(ActivityFilter)
