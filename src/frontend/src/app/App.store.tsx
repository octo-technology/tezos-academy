import { offline } from '@redux-offline/redux-offline'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { reducers } from '../reducers'
import { storeOfflineConfig } from './App.offline'

export const history = createBrowserHistory()

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

export function configureStore(preloadedState: any) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose
  const store = createStore(
    reducers(history),
    preloadedState,
    composeEnhancer(applyMiddleware(routerMiddleware(history)), applyMiddleware(thunk), offline(storeOfflineConfig)),
  )

  return store
}
