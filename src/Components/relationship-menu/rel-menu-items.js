import React, { Component } from 'react'
import Graphs from '../graphs/graphs'
import TeQuieroContext from '../../context'
import { QServices } from '../../services/api-services'
import { indexOf } from 'lodash'
import StackedBars from '../graphs/stacked-bars'

export class Analytics extends Component {

  static contextType = TeQuieroContext
  
  state = {
    page: 'you',
    userData: [],
    relData: [],
    alertData: [],
    qIndex: 0
  }

  componentDidMount() {
    this.context.setError(null)

    QServices.getQuestionaireUserData()
      .then(data => this.setState({userData: data}))

    QServices.getQuestionaireRelData()
      .then(data => this.setState({relData: data}))
  }

  componentWillUnmount() {
    this.context.setError(null)
  }

  handleClickYou = (e) => {
    e.preventDefault()
    this.setState({
      page: 'you' 
    })
  }

  handleClickRel = (e) => {
    e.preventDefault()
    this.setState({
      page: 'relationship' 
    })
  }

  handleQChange = () => {
    const index = document.getElementById('option')
    this.setState({
      qIndex: index.value
    })
  }

  render() {
    const userQuestions = []
    let {userData} = this.state
    if( this.state.page === 'relationship') {
      userData = this.state.relData
    }
    userData.map(qs => userQuestions.push(qs.question))
    const uniqueUserQuestions = userQuestions.filter((v, i, a) =>
      a.indexOf(v) === i
    )
    const userQuestionData = [] 
    uniqueUserQuestions.map(qs =>
      userQuestionData.push(
        {
          question: qs,
          joy:[],
          disgust:[],
          sadness: [],
          anger: [],
          fear: [],
          mood: []
        }
      )
    )
    const zoomDomain = () => {
      let dates = []
      for( let i =0; i < userData.length; i++) {
        dates.push(new Date(userData[i].date_created).toLocaleDateString())
      }
      dates.sort((a,b) => new Date(a) - new Date(b))

      const beg = new Date(dates.slice(0,1))
      const end = new Date(dates.slice(-1))
      const begYear = beg.getFullYear()
      const endYear = end.getFullYear()
      const begMonth = beg.getMonth()
      const endMonth = end.getMonth()
      const begDay = beg.getDate()
      const endDay = end.getDate()
      
      return {
        x : [
          new Date(begYear, begMonth, begDay),
          new Date(endYear, endMonth, endDay)
        ]
      }
    }
    
    const userJoyData = []
    userData.map(data => userJoyData.push(
      {
        key: new Date(data.date_created),
        b: data.joy
      }
    ))

    if(userQuestionData.length > 0) {
      for(let i = 0; i < userQuestionData.length; i++) {
        for(let j = 0; j < userData.length; j++) {
          if(userQuestionData[i].question === userData[j].question) {
            userQuestionData[i].joy.push(
              {
                x: userData[j].date_created,
                y: userData[j].joy
              }
            )
            userQuestionData[i].disgust.push(
              {
                x: userData[j].date_created,
                y: userData[j].disgust
              }
            )
            userQuestionData[i].sadness.push(
              {
                x: userData[j].date_created,
                y: userData[j].sadness
              }
            )
            userQuestionData[i].anger.push(
              {
                x: userData[j].date_created,
                y: userData[j].anger
              }
            )
            userQuestionData[i].fear.push(
              {
                x: userData[j].date_created,
                y: userData[j].fear
              }
            )
            userQuestionData[i].mood.push(
              {
                x: userData[j].date_created,
                y: userData[j].mood
              }
            )
          }
        }
      }
    }

    const questionOptions = uniqueUserQuestions.map(question =>
      <option
        key={uniqueUserQuestions.indexOf(question)}
        className="qOptions"
        value={uniqueUserQuestions.indexOf(question)}
      >
        {question}
      </option>)

    const displayYouSec = () => {
      return (
        <div className="analyticCon">
          <h2>
            <select id='option' onChange={this.handleQChange}>
              ${questionOptions}
            </select>
          </h2>
          <Graphs
            zoomDomain={zoomDomain}
            lineZoomData={userQuestionData[this.state.qIndex]}
            userData={userQuestionData[this.state.qIndex]}
            page={this.state.page}>
          </Graphs>
          <StackedBars/>
        </div>
      )
    }

    const displayYourRelSec = () => {
      return (
        <div className="analyticCon">
          <h2>
            <select id='option' onChange={this.handleQChange}>
              ${questionOptions}
            </select>
          </h2>
          <Graphs
            zoomDomain={zoomDomain}
            lineZoomData={userQuestionData[this.state.qIndex]}
            userData={userQuestionData[this.state.qIndex]}
            page={this.state.page}
          >
          </Graphs>
        </div>
      )
    }

    const { page } = this.state

    return (
      <div className="anlCon">
        <div className="anlBtnCon">
          <button className="anlYouBtn" onClick={e => this.handleClickYou(e)}>
            You
          </button>
          <button className="anlRelBtn" onClick={e => this.handleClickRel(e)}>
            Relationship
          </button>
        </div>
        <h2 className="anlH2">
          {page === 'you'? 'User Data': 'Relationship Data'}
        </h2>
        { page === 'you'? displayYouSec(): displayYourRelSec()}
      </div>
    )
  }
}

export class Alerts extends Component {

  static contextType = TeQuieroContext

  state = {
    test: "test",
    alertData: []
  }

  componentDidMount() {
    this.context.setError(null)
    QServices.getAlertsData()
      .then(data => this.setState({alertData: data}))
  }

  componentWillUnmount() {
    this.context.setError(null)
  }

  render() {
    const {alertData} = this.state
    let users = []
    alertData.map(alert => users.push(alert.first_name))
    let uniqueUsers = [...new Set(users)]
    let user1 = alertData.filter(alert =>
      alert.first_name === uniqueUsers[0]).sort((a,b) =>
        a.question > b.question
    )
    let user2 = alertData.filter(alert =>
      alert.first_name === uniqueUsers[1]).sort((a,b) =>
        a.question > b.question
    )
    let issues = []
    for(let i = 0; i < user1.length; i ++) {
      for(let j = 0; j < user2.length; j++) {
        if(user1[i].question === user2[j].question) {
          if((user1[i].scores.avgMood - user2[j].scores.avgMood) > 20 ||
            (user1[i].scores.avgMood - user2[j].scores.avgMood) < -20 ||
            ((user1[i].scores.avgMood + user2.scores.avgMood) / 2) < 60) {
              issues.push({
                question: user1[i].question,
                user1Mood: user1[i].scores.avgMood,
                user2Mood: user2[j].scores.avgMood,
                average: (
                  user1[i].scores.avgMood + user2[j].scores.avgMood
                ) / 2,
                variance: Math.abs(
                  user1[i].scores.avgMood - user2[j].scores.avgMood
                )
              })
          }
        }
      }
    }

    function returnStatus(issue) {
      let status = null
      if((issue.variance > 15 && issue.variance <= 20)
        || (issue.average > 65 && issue.average <= 70)) {
          status = "yellow"
        }
      if( (issue.variance > 15 && issue.variance <= 20)
        || (issue.average > 65 && issue.average <= 70)) {
          status = "orange"
        }
      if(issue.variance > 20 || issue.average < 65) {
        status = "red"
      }
      return status
    }
    let displayAlerts = issues.map(issue =>
      <li key={issues.indexOf(issue)} className="alertsLi" id={indexOf(issue)}>
        <span className="alertsSpan">{issue.question} </span>
        <div className="alertsStatusCon">
          <span>Status:</span>
          { 
            returnStatus(issue) === 'yellow' &&
            <div className="lowAlert status"> </div>
          }
          { 
            returnStatus(issue) === 'orange' &&
            <div className="midAlert status"> </div>
          }
          { 
            returnStatus(issue) === 'red' &&
            <div className="highAlert status"> </div>
          }
        </div>
      </li>
    )
    
    return (
      <section className="alertsCon">
        <div className="alertsLegend">
          <h2 className="alertsH2">Issues Danger Level</h2>
          <div className="statusLegCon">
            <div className="statusCon">
              <div className="highAlert"/><span>High</span>
            </div>
            <div className="statusCon">
              <div className="midAlert"/><span>Moderate</span>
            </div>
            <div className="statusCon">
              <div className="lowAlert"/><span>Low</span>
            </div>
          </div>
        </div>
        {
          issues.length > 0
          ? <h4 className="alertsH4">The following needs your attention:</h4>
          : <h4 className="alertsH4">No News Is Good News:</h4>
        }
        <ul className="alertsUL">
          {displayAlerts}
        </ul>
      </section>
    )
  }
}

export class AddIssue extends Component {

  static contextType = TeQuieroContext

  state = {
    section: "Yourself"
  }

  componentDidMount() {
    this.context.setError(null)
  }

  componentWillUnmount() {
    this.context.setError(null)
  }

  submitNewQuestion = (e) => {
    e.preventDefault()
    const { question, category, section } = e.target
    let sectionV = section.value
    if(sectionV === "Yourself") {
      sectionV = "Opening"
    }
    const newQuestion = {
      question: question.value,
      category: category.value,
      section: sectionV
    }

    QServices.postNewUserQuestions(newQuestion)
      .then(res => {
        category.value = 'Yourself'
        question.value = 'Personal'
        section.value = ''
      }
    )
    .catch(e => this.context.setError(e.error))
  }

  handleOptionSel = () => {
    const section = document.getElementById("section").value
    this.setState({
      section
    })
  }

  render() {

    const categories = [
      'Sex',
      'Chores',
      'Communication',
      'Parenting',
      'Friendship',
      'Trust'
    ]
    const relOptions = categories.map(cat =>
      <option key={categories.indexOf(cat)} value={cat}>{cat}</option>
    )
    const youOptions = <option value="Personal">Personal</option>

    return (
      <section className="addIssueCon">
        <form className="issueForm" onSubmit={this.submitNewQuestion}>
          <fieldset className="issueFS">
            <legend className="issueLegend">Add an issue</legend>
            <div className="issueInputCon">
              <label>Section</label>
              <select
                name="section"
                id="section"
                onChange={this.handleOptionSel}
              >
                <option value="Yourself">Yourself</option>
                <option value="Relationship">Relationship</option>
              </select>
            </div>
            <div className="issueInputCon">
              <label>Category</label>
              <select name="category">
                {this.state.section === "Relationship"? relOptions: youOptions}
              </select>
            </div>
            <div className="issueInputCon">
              <label>Issue</label>
              <input name="question" type="text"></input>
            </div>
          </fieldset>
          <button className="issueBtn" type="submit">Submit</button>
        </form>
      </section>
    )
  }
}