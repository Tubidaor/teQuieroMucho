import React, { Component } from 'react';
import './StatusBar.css'
import { QServices } from '../../Services/APIServices';

export default class StatusBar extends Component {

  // state = {
  //   userData: [],
  //   relData: []
  // }

  // componentDidMount() {
  //   QServices.getGenQuestions
  // }
  // setUserData = (userData) => {
  //   this.setState({userData})
  // }

  // setRelData = (relData) => {
  //   this.setState({relData})
  // }
  render() {
    console.log(this.props.stateofMind)
    return (
      <section className="statusBarSection">
        <div className="yourStateofMind">
            <h4>State of Mind</h4>
            <p className="stateofMindScore">{this.props.stateofMind}</p>
        </div>
        <div className="rState">
          <h4>Relationship State</h4>
            <p className="stateofRScore">{this.props.rQuality}</p>
        </div>
      </section>
    )
  }
}