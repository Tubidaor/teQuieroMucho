import React, { Component } from 'react';
import RegForm from '../../Components/Registration/RegForm';
import Error from '../../Components/Error/Error'
import TeQuieroContext from '../../Context';

export default class RegPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    }
  }
  static contextType = TeQuieroContext

  handleRegSuccess = () => {
    console.log('regran')
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/login'
    history.push(destination)
    console.log(destination)
  }

  render() {
    const { error } = this.context
    return (
      <section className="regSection">
        <h2 className="regFormH2">Sign Up</h2>
        {error && <Error/> }
        <RegForm onRegSuccess={this.handleRegSuccess}/>
      </section>
    )
  }
}