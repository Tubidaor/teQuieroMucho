import React, { Component } from 'react';
import TeQuieroContext from '../../Context';
import './Login.css'
import { AuthServices } from '../../Services/APIServices';

export default class Login extends Component {

static contextType = TeQuieroContext

  handleLoginJwtAuth = (e) => {
    e.preventDefault()
    const { userName, password } = e.target
    const credentials = {
      user_name: userName.value,
      password: password.value
    }
    AuthServices.login(credentials)
      .then(res => {
        userName.value = ''
        password.value = ''
        console.log(res)
        // TokenServices.saveAuthToken(res)
        this.props.handleLoginSuccess()
      })
      .catch(e => this.context.setError(e))
      console.log(this.context.error)
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