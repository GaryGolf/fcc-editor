import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store'
import App from './components/App'

const store = configureStore()

ReactDOM.render(
  <Provider store={store} key="provider">
    <App/>
  </Provider>,
  document.querySelector('#menu-visual') 
)