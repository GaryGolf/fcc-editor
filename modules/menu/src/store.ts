import { createStore, applyMiddleware, Store, Middleware } from 'redux'
import {createEpicMiddleware} from 'redux-observable'
import * as createLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import * as ReduxPromise from 'redux-promise'
import {routerMiddleware} from 'react-router-redux'
import rootReducer, { RootState } from './reducers'
// import rootEpic from './epics'


export default function configureStore(history, initialState?: RootState): Store<RootState> {
  const create = window.devToolsExtension && !PRODUCTION
    ? window.devToolsExtension()(createStore)
    : createStore

  // const epicMiddleware = createEpicMiddleware(rootEpic)
  const middleware: Middleware[] =[ReduxThunk, ReduxPromise, routerMiddleware(history)] // epicMiddleware] 
  if(!PRODUCTION) middleware.push(createLogger({collapsed: true}))  
  const createStoreWithMiddleware = applyMiddleware(...middleware)(create)

  const store = createStoreWithMiddleware(rootReducer, initialState) as Store<RootState>

  if (!PRODUCTION && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(require('./reducers'))
    })
    // module.hot.accept('./epics', () => {
    //   const rootEpic = require('./epics').default
    //   epicMiddleware.replaceEpic(rootEpic)
    // })
  }

  return store
}