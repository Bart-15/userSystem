import React, { Component } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { BrowserRouter as Router, Route
 } from "react-router-dom";
import {Provider} from 'react-redux'
import store from './store'
import '../src/styles/index.css'
import checkJwt from './utils/checkJwt'



if(localStorage.jwtToken) {
    checkJwt(localStorage.jwtToken)
}


class App extends Component {
  render() {
    return (
      <>
      <Provider store={store}>
        <Router>
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
        </Router>
      </Provider>
      </>
    )
  }
}

export default App;