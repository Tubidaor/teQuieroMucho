import React, { Component } from 'react'
import TeQuieroContext from '../../context'
import './login.css'
import { AuthServices, QServices } from '../../services/api-services'
import Error from '../error/error'
import TokenServices from '../../services/token-services'

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
        TokenServices.saveAuthToken(res.authToken)
        let token = res.authToken
        return token
      })
      .then(token => {
        QServices.getGenQuestions(token)
          .then(questions => {
            const openingQs = questions.filter(item =>
              item.section === 'Opening'
            )
            const relationshipQs  = questions.filter(item =>
              item.section === 'Relationship'
            )
            this.context.setOpeningQuestions(openingQs)
              .then(
                QServices.openingQsToSessionStorage(JSON.stringify(openingQs))
              )
            this.context.setRelationshipQuestions(relationshipQs)
              .then(
                QServices.relQsToSessionStorage(JSON.stringify(relationshipQs))
              )
          })
          .then( this.props.handleLoginSuccess())
        }
      )
      .catch(e => this.context.setError(e.error))
  }

  render() {

    return (
        <form className="loginForm" onSubmit={this.handleLoginJwtAuth}>
          <div className="loginForm233">
            <h2 className="loginH2">Login</h2>
            {this.context.error && <Error/>}
            <div className="email">
              <label className="loginLabel" htmlFor="loginForm_email">
                Email
              </label>
              <input name="email" id="loginForm_email"></input>
            </div>
            <div className="password">
              <label  className="loginLabel" htmlFor="password">Password</label>
              <input name="password" id="password"></input>
            </div>
          </div>
          <button className="loginButton" type="submit">Submit</button>
        </form>
    )
  }
}