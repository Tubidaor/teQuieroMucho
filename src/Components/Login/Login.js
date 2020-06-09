import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {

  render() {

    return (
      <div className="loginContainer">
        <form className="loginForm">
          <h2 className="loginH2">Login</h2>
          <div className="userName">
            <label htmlFor="loginForm_userName">User name</label>
            <input name="userName" id="loginForm_userName"></input>
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input name="password" id="password"></input>
          </div>
          <button className="loginButton" type="submit">Submit</button>


        </form>

      </div>
    )
  }
}