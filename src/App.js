import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IntroPage from './pages/intro-page/intro-page'
import './app.css'
import LoginPage from './pages/login-page/login-page'
import RegPage from './pages/req-page/reg-page'
import OpeningQs from './pages/opening-qs/opening-qs'
import HomePage from './pages/home-page/home-page'

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
