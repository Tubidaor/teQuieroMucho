import React, { Component } from 'react'
import RegForm from '../../components/registration/reg-form'
import './reg-page.css'

export default class RegPage extends Component {

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    }
  }

  handleRegSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/login'
    history.push(destination)
  }

  render() {
    return (
      <section className="regSection">
        <RegForm onRegSuccess={this.handleRegSuccess}/>
      </section>
    )
  }
}