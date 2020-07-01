import React, { Component } from 'react';
import './Login.css'
import { AuthServices } from '../../Services/APIServices';

export default class Login extends Component {


  handleLoginJwtAuth = (e) => {
    e.preventDefault()
    const { userName, password } = e.target
    const credentials = {
      user_name: userName.value,
      password: password.value
    }
    AuthServices.login(credentials)
      // .then(res => {
      //   userName.value = ''
      //   password.value = ''
      //   //saveAuthToken
      //   //handlelogin sucess.
      // })
  }




  render() {

    return (
      <div className="loginContainer">
        <form className="loginForm" onSubmit={this.handleLoginJwtAuth}>
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