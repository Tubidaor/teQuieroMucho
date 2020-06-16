import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import TeQuieroContext from '../../Context';
import StatusBar from '../../Components/StatusBar/StatusBar';
import NavBar from '../../Components/NavBar/NavBar';
import './HomePage.css'
import JournalPage from '../JournalPage/JournalPage';
import JournalMenu from '../../Components/JournalMenu/JournalMenu';




export default class HomePage extends Component {

  static contextType = TeQuieroContext
  state = {
    currentSection: "home"
  }

  handleClick = (currentSection) => {
    
    this.setState({
      currentSection
    })
    console.log(this.state.currentSection)
  }

  render() {
    let { stateofMind, rQuality } = this.context
    let currentSection = this.state.currentSection
    return (
      <div>

        <StatusBar stateofMind={stateofMind} rQuality={rQuality}></StatusBar>
        {currentSection === "Journal" && <JournalMenu/>}
        <footer className="homeFooter">
        <NavBar handleClick={this.handleClick}></NavBar>
        </footer>
      </div>
    )
  }
}