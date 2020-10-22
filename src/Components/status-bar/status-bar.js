import React, { Component } from 'react'
import './status-bar.css'

export default class StatusBar extends Component {

  render() {
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