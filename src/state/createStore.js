import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'

import demoState from './demoState'

// --

const persistConfig = {
  key: 'stravels-state',
  storage
}

// --

export default () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(
    persistedReducer,
    demoState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
