import React, { Component } from 'react';
import Login from '../../Components/Login/Login';



export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    }
  }
  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/openingQs'
    history.push(destination)
    console.log(location.state)
  }

  render() {

    return (
      <section className="loginSection">
        <Login handleLoginSuccess={this.handleLoginSuccess}/>
      </section>
    )
  }
}