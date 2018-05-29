import { createStore } from 'redux'
import reducer from './reducers'

// --

import demoState from './demoState'

export default () => {
  const store = createStore(
    reducer,
    demoState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  return store
}
