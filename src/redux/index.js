import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './modules'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './saga'

const composeEnhancers = (process.env.NODE_ENV !== 'production' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  })  : null) || compose
const sagaMiddleware = createSagaMiddleware()

let store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
