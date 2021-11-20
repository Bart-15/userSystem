import React, { Component } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import UpdateAvatar from './components/dropzone/UpdateAvatar'
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter as Router, Switch, Route
 } from "react-router-dom";
import {Provider} from 'react-redux'
import store from './store'
import '../src/styles/index.css'
import checkJwt from './utils/checkJwt'
import PrivateRoute from './utils/PrivateRoute'



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
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/update-avatar" component={UpdateAvatar} />  
          </Switch>
        </Router>
      </Provider>
      </>
    )
  }
}

export default App;