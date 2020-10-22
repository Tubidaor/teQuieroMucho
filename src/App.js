import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IntroPage from './Pages/IntroPage/intro-page'
import './App.css'
import LoginPage from './Pages/LoginPage/login-page'
import RegPage from './Pages/RegPage/reg-page'
import OpeningQs from './Pages/OpeningQs/opening-qs'
import HomePage from './Pages/HomePage/home-page'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={"/"}
          component={IntroPage}
        />
        <Route
          exact
          path={"/login"}
          component={LoginPage}
        />
        <Route
          exact
          path={"/register"}
          component={RegPage}
        />
        <Route
        exact
        path={"/openingQs"}
        component={OpeningQs}
        />
        <Route
        exact
        path={"/home"}
        component={HomePage}
        />
      </Switch>
    </div>
  )
}

export default App
