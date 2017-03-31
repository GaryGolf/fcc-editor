import { createStore, applyMiddleware, Store, Middleware } from 'redux'
import {createLogger} from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import * as ReduxPromise from 'redux-promise'
import {routerMiddleware} from 'react-router-redux'
import rootReducer, { RootState } from './reducers'

export default function configureStore(history, initialState?: RootState): Store<RootState> {
  const create = window.devToolsExtension && !PRODUCTION
    ? window.devToolsExtension()(createStore) : createStore

  const middleware: Middleware[] =[ReduxThunk, ReduxPromise, routerMiddleware(history)]
  if(!PRODUCTION) middleware.push(createLogger({collapsed: true}))  
  const createStoreWithMiddleware = applyMiddleware(...middleware)(create)

  const store = createStoreWithMiddleware(rootReducer, initialState) as Store<RootState>

  if (!PRODUCTION && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(require('./reducers'))
    })
  }

  return store
}