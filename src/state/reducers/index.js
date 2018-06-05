import { combineReducers } from 'redux'

// Sub-reducers --

import travels from './travels'
import activities from './activities'
import activityFilter from './activityFilter'

// Root Reducer --

export default combineReducers({
  travels,
  activities,
  activityFilter
})
