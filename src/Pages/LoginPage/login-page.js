import React, { Component } from 'react'
import Login from '../../components/login/login'
import TeQuieroContext from '../../context'
import './login-page.css'



export default class LoginPage extends Component {

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    }
  }

  static contextType = TeQuieroContext

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/openingQs'

    setTimeout(() =>
      history.push(destination), 500
    )
  }

  render() {

    return (
      <section className="loginSection">
        <Login handleLoginSuccess={this.handleLoginSuccess}/>
      </section>
    )
  }
}