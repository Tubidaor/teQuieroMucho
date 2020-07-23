import React, { Component } from 'react';
import Login from '../../Components/Login/Login';
import { QServices } from '../../Services/APIServices';



export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    }
  }
 handleLoginSuccess = () => {
    QServices.getGenQuestions()
      .then(res => {
        console.log('genQsran')
        const openingQs = res.filter(item => item.section === 'Opening')
        console.log(openingQs)
        this.context.setOpeningQuestions(openingQs)
      })
  
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