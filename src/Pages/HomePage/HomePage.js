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
import { QServices } from '../../Services/APIServices';






export default class HomePage extends Component {

  static contextType = TeQuieroContext
  state = {
    currentSection: "Home",
    stateofMind: [],
    stateofRel: []
  }

  componentDidMount() {

    const currentSection = this.state

    QServices.getQuestionaireUserData()
      .then(data => 
        this.setState({stateofMind: this.setMood(QServices.getTQMState(data,data,currentSection))
        }, console.log(this.state.stateofMind))
      )


    QServices.getQuestionaireRelData()
      .then(data => 
        this.setState({stateofRel: this.setMood(QServices.getTQMState(data,data,currentSection))
        }, console.log(this.state.stateofRel))
      )
  }

  expand = () => {
    console.log("expandrand")
    document.getElementById("menuExpand").classList.toggle("expand")
    document.getElementById("menuListExpand").classList.toggle("expandList")
    document.getElementById('homeFooter').classList.toggle('expandFooter')
  }

  handleClick = (currentSection) => {
    
    this.expand()
    this.setState({
      currentSection
    })

  }

  handleLogout = () => {
    
    const { history } = this.props
    TokenServices.clearAuthToken()
    QServices.clearOpeningDataFromStorage()
    QServices.clearRelDataFromStorage()
    history.push('/')
  }

  redirect = (currentSection) => {
    this.setState({
      currentSection
    })
  }

  setMood = (userQuestionData) => {
    // let joy = []
    // let disgust = []
    // let sadness = []
    // let anger = []
    // let fear = []
    let mood = []
    let state = ''

    // console.log("uQData", userQuestionData)
    // const question = userQuestionData
    userQuestionData.forEach(question => {
    if(question === undefined) {
      return []
    } else {
      for (let i = 0; i < question.joy.length; i++) {
        // joy.push(question.joy[i].y)
        // disgust.push(question.disgust[i].y)
        // sadness.push(question.sadness[i].y)
        // anger.push(question.anger[i].y)
        // fear.push(question.fear[i].y)
        mood.push(question.mood[i].y)

      }
    }
    })
    
    function arrAvg(arr) {
      return arr.reduce((a,b) => a + b, 0) / arr.length
    }
    // const avgJoy = Math.round(arrAvg(joy))
    // const avgDisgust = Math.round(arrAvg(disgust))
    // const avgSadness = Math.round(arrAvg(sadness))
    // const avgAnger = Math.round(arrAvg(anger))
    // const avgFear = Math.round(arrAvg(fear))
    const avgMood = Math.round(arrAvg(mood))
    if(avgMood > 90 ) {
      state = "Blissful"
    }
    if(avgMood >= 80 && avgMood < 90)  {
      state = "Joyful"
    }
    if(avgMood >= 70 && avgMood < 80) {
      state = "Happy"
    }
    if(avgMood >= 60 && avgMood < 70) {
      state = "Okay"
    }
    if(avgMood >= 50 && avgMood < 60) {
      state = "Indifferent"
    }
    if(avgMood >= 40 && avgMood < 50) {
      state = "Pessimistic"
    }
    if(avgMood >= 30 && avgMood < 40) {
      state = "Sad"
    }
    if(avgMood < 30) {
      state = "Depressed"
    }
    return state
  }
  
  render() {
    let { stateofMind, stateofRel, currentSection } = this.state

    return (
      <div>

        <StatusBar stateofMind={stateofMind} rQuality={stateofRel}></StatusBar>
        {currentSection === "Home" && <EventsPage/>}
        {currentSection === "Journal" && <JournalPage/>}
        {currentSection === "Relationship" && <RelationshipPage/>}
        {currentSection === "AddReq" && <AddReqPage redirect={this.redirect}/>}


        <footer className="homeFooter" id="homeFooter">
          <NavBar expand={this.expand} handleClick={this.handleClick} handleLogout={this.handleLogout}></NavBar>
        </footer>
      </div>
    )
  }
}