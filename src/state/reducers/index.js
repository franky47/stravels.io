import { combineReducers } from 'redux'

// Sub-reducers --

import travels from './travels'
import activities from './activities'

// Root Reducer --

export default combineReducers({
  travels,
  activities
})
