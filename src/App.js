import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IntroPage from './pages/IntroPage/intro-page'
import './App.css'
import LoginPage from './pages/LoginPage/login-page'
import RegPage from './pages/RegPage/reg-page'
import OpeningQs from './pages/OpeningQs/opening-qs'
import HomePage from './pages/HomePage/home-page'

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
