import React, { Component } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { Routes, Route } from "react-router-dom";

import '../src/styles/index.css'

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    )
  }
}

export default App;