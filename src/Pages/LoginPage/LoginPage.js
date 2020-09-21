import React, { Component } from 'react';
import Login from '../../Components/Login/Login';
import TeQuieroContext from '../../Context';
import './LoginPage.css'



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
    history.push(destination)
  }

  render() {

    return (
      <section className="loginSection">
        <Login handleLoginSuccess={this.handleLoginSuccess}/>
      </section>
    )
  }
}