import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer } from '../../reducers'

export const history = createBrowserHistory()

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

export function configureStore(preloadedState: any) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(routerMiddleware(history)), applyMiddleware(thunk))
  )

  return store
}
