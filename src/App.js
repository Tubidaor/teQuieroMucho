import React from 'react';
import { Switch, Route } from 'react-router-dom'
import IntroPage from './Pages/IntroPage/IntroPage';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegPage from './Pages/RegPage/RegPage';
import OpeningQs from './Pages/OpeningQs/OpeningQs';
import HomePage from './Pages/HomePage/HomePage';
import AddReqPage from './Pages/AddReqPage/AddReqPage';

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
  );
}

export default App;
