import React, { Component } from 'react';
// import { Link, Switch, Route } from 'react-router-dom';
import TeQuieroContext from '../../Context';
import StatusBar from '../../Components/StatusBar/StatusBar';
import NavBar from '../../Components/NavBar/NavBar';
import './HomePage.css'
import JournalPage from '../JournalPage/JournalPage';
import RelationshipPage from '../RelationshipPage/RelationshipPage';
import TokenServices from '../../Services/token-services';
import EventsPage from '../EventsPage/EventsPage';
import AddReqPage from '../AddReqPage/AddReqPage';






export default class HomePage extends Component {

  static contextType = TeQuieroContext
  state = {
    currentSection: "Home"
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

  handleLogout = () => {
    
    const { history } = this.props
    TokenServices.clearAuthToken()
    history.push('/')
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
        {currentSection === "Home" && <EventsPage/>}
        {currentSection === "Journal" && <JournalPage/>}
        {currentSection === "Relationship" && <RelationshipPage/>}
        {currentSection === "AddReq" && <AddReqPage/>}


        <footer className="homeFooter">
        <NavBar handleClick={this.handleClick} handleLogout={this.handleLogout}></NavBar>
        </footer>
      </div>
    )
  }
}