import React, { Component, Fragment } from 'react'
import ReactDOM, { render } from 'react-dom'
import HomePage from './components/HomePage'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

render(
<Fragment>
  <Provider store={store}>
    <Router>
      <HomePage />
    </Router>
  </Provider>
</Fragment>, 
document.getElementById('app'))