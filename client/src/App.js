import React, { Component } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import UpdateAvatar from './components/dropzone/UpdateAvatar'
import Dashboard from './components/dashboard/Dashboard'
import { createTheme, ThemeProvider } from '@mui/material/styles';
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


const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  }
})

class App extends Component {
  render() {
    return (
      <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/' component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/update-avatar" component={UpdateAvatar} />  
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
      </>
    )
  }
}

export default App;