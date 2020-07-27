import React, { Component } from 'react';
import TeQuieroContext from '../../Context';
import './Login.css'
import { AuthServices, QServices } from '../../Services/APIServices';
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
        let token = res.authToken
        return token
      })
      .then(token => {
        QServices.getGenQuestions(token)
          .then(questions => {
            const openingQs = questions.filter(item => item.section === 'Opening')
            const relationshipQs  = questions.filter(item => item.section === 'Relationship')
            this.context.setOpeningQuestions(openingQs)
            this.context.setRelationshipQuestions(relationshipQs)
            this.props.handleLoginSuccess()
          })
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