import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import teQuieroContext from '../../Context';
import StatusBar from '../../Components/StatusBar/StatusBar';
import NavBar from '../../Components/NavBar/NavBar';
import './HomePage.css'



export default class HomePage extends Component {

  static contextType = teQuieroContext

  render() {
    let { stateofMind, rQuality } = this.context
    return (
      <div>

        <StatusBar stateofMind={stateofMind} rQuality={rQuality}></StatusBar>
        <footer className="homeFooter">
        <NavBar></NavBar>

        </footer>
      </div>
    )
  }
}