import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import  { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store'
import App from './components/App'

const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router history={history} >
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('layout') 
)