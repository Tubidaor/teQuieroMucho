import React from 'react';
import { Switch, Route } from 'react-router-dom'
import IntroPage from './Pages/IntroPage/IntroPage';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegPage from './Components/Registration/RegForm';

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
      </Switch>
    </div>
  );
}

export default App;
