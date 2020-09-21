import React, { Component } from 'react';
import RegForm from '../../Components/Registration/RegForm';
import TeQuieroContext from '../../Context';
import './RegPage.css'

export default class RegPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    }
  }

  handleRegSuccess = () => {
    console.log('regran')
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/login'
    history.push(destination)
    console.log(destination)
  }

  render() {
    return (
      <section className="regSection">
        <RegForm onRegSuccess={this.handleRegSuccess}/>
      </section>
    )
  }
}