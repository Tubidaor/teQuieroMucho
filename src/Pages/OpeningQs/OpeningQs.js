import React, { Component } from 'react';
import Questions from '../../Components/Questions/questions';
import TeQuieroContext from '../../Context';
import './OpeningQs.css';

export default class OpeningQs extends Component {

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }

  static contextType = TeQuieroContext




  handlePushToHome = () => {
  const { history, location } = this.props
  const destination = (location.state || {}).from || '/home'
  history.push(destination)
  }


  render() {

    return (
      <section className="qSection">
        <Questions handlePushURL={this.handlePushToHome} qType="Opening"/>
      </section>
    )
  }
}