import React, { Component } from 'react';
import Questions from '../../Components/Questions/Questions';
import './OpeningQs.css';


export default class OpeningQs extends Component {

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }

  handlePushToHome = () => {
  const { history, location } = this.props
  const destination = (location.state || {}).from || '/home'
  console.log(destination, history)
  history.push(destination)
  }


  render() {

    return (
      <section className="qSection">
        <Questions handlePushToHome={this.handlePushToHome} qType="opening"/>
      </section>
    )
  }
}