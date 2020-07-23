import React, { Component } from 'react';
import TeQuieroContext from '../../Context';
import './Login.css'
import { AuthServices } from '../../Services/APIServices';
import Error from '../Error/Error';
import TokenServices from '../../Services/token-services';

export default class Login extends Component {

static contextType = TeQuieroContext

componentWillUnmount() {
  this.context.setError(null)
}

  handleLoginJwtAuth = (e) => {
    e.preventDefault()
    const { email, password } = e.target
    const credentials = {
      email: email.value,
      password: password.value
    }
    AuthServices.login(credentials)
      .then(res => {
        email.value = ''
        password.value = ''
        console.log(res)
        TokenServices.saveAuthToken(res.authToken)
        this.props.handleLoginSuccess()
      })
      .catch(e => this.context.setError(e.error))
      console.log(this.context.error)
  }




  render() {

    return (
      <div className="loginContainer">
        <form className="loginForm" onSubmit={this.handleLoginJwtAuth}>
          <h2 className="loginH2">Login</h2>
          {this.context.error && <Error/>}
          <div className="email">
            <label htmlFor="loginForm_email">Email</label>
            <input name="email" id="loginForm_email"></input>
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