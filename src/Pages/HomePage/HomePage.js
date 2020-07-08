import React, { Component } from 'react';
// import { Link, Switch, Route } from 'react-router-dom';
import TeQuieroContext from '../../Context';
import StatusBar from '../../Components/StatusBar/StatusBar';
import NavBar from '../../Components/NavBar/NavBar';
import './HomePage.css'
import JournalPage from '../JournalPage/JournalPage';
import RelationshipPage from '../RelationshipPage/RelationshipPage';






export default class HomePage extends Component {

  static contextType = TeQuieroContext
  state = {
    currentSection: "home"
  }

  handleClick = (currentSection) => {
    const expand = function() {
      console.log("expandrand")
      document.getElementById("menuExpand").classList.toggle("expand")
      document.getElementById("menuListExpand").classList.toggle("expandList")
    }
    expand()
    this.setState({
      currentSection
    })

  }

  // handleCancel = () => {
  //   this.setState({
  //     currentSection: 'Journal'
  //   })

  // }

  render() {
    let { stateofMind, rQuality } = this.context
    let currentSection = this.state.currentSection
    return (
      <div>

        <StatusBar stateofMind={stateofMind} rQuality={rQuality}></StatusBar>

        {currentSection === "Journal" && <JournalPage/>}
        {currentSection === "Relationship" && <RelationshipPage/>}

        <footer className="homeFooter">
        <NavBar handleClick={this.handleClick}></NavBar>
        </footer>
      </div>
    )
  }
}