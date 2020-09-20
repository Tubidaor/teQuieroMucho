import React, { Component } from 'react';
// import { analyticsData} from '../../Services/APIServices';
import Graphs from '../Graphs/Graphs';
import TeQuieroContext from '../../Context';
import { QServices } from '../../Services/APIServices';
import { indexOf } from 'lodash';

export class Analytics extends Component {
  state = {
    page: 'you',
    userData: [],
    relData: [],
    alertData: [],
    qIndex: 0
  }

  componentDidMount() {

    QServices.getQuestionaireUserData()
      .then(data => this.setState({userData: data}))

    QServices.getQuestionaireRelData()
      .then(data => this.setState({relData: data}))

  
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
    // const data = analyticsData
    const userQuestions = []
    let {userData} = this.state
    if( this.state.page === 'relationship') {
      userData = this.state.relData
    }
    userData.map(qs => userQuestions.push(qs.question))
    const uniqueUserQuestions = userQuestions.filter((v, i, a) => a.indexOf(v) === i);
    const userQuestionData = [] 
    uniqueUserQuestions.map(qs => userQuestionData.push({ question: qs, joy:[], disgust:[], sadness: [], anger: [], fear: [], mood: [] }))
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
      
      return {x : [new Date(begYear, begMonth, begDay), new Date(endYear, endMonth, endDay)]}
    }
    
    const userJoyData = []
    userData.map(data => userJoyData.push({key: new Date(data.date_created), b: data.joy } ))
    if(userQuestionData.length > 0) {
      for(let i = 0; i < userQuestionData.length; i++) {
        
        for(let j = 0; j < userData.length; j++) {
          if(userQuestionData[i].question === userData[j].question) {
            userQuestionData[i].joy.push({x: userData[j].date_created, y: userData[j].joy})
            userQuestionData[i].disgust.push({x: userData[j].date_created, y: userData[j].disgust})
            userQuestionData[i].sadness.push({x: userData[j].date_created, y: userData[j].sadness})
            userQuestionData[i].anger.push({x: userData[j].date_created, y: userData[j].anger})
            userQuestionData[i].fear.push({x: userData[j].date_created, y: userData[j].fear})
            userQuestionData[i].mood.push({x: userData[j].date_created, y: userData[j].mood})

          }
        }
      }
    }

    const questionOptions = uniqueUserQuestions.map(question => <option value={uniqueUserQuestions.indexOf(question)}>{question}</option>)
    
      
    const displayYouSec = () => {
      return (
        <div className="youAnlSection">
          <h2><select id='option' onChange={this.handleQChange}>${questionOptions}</select></h2>
          <Graphs
            zoomDomain={zoomDomain}
            lineZoomData={userQuestionData[this.state.qIndex]}
            userData={this.state.userData}
            relData={this.state.relData}
            page={this.state.page}>

          </Graphs>
        </div>
      )
    }

    const displayYourRelSec = () => {
      return (
        <div className="relAnlSection">
          <h2><select id='option' onChange={this.handleQChange}>${questionOptions}</select></h2>
          <Graphs
            zoomDomain={zoomDomain}
            lineZoomData={userQuestionData[this.state.qIndex]}
            userData={this.state.userData}
            relData={this.state.relData}
            page={this.state.page}
          >

          </Graphs>
        </div>
      )
    }


    const { page } = this.state

    console.log(userQuestionData)
    console.log('alert data', this.state.alertData)
    return (

      <section className="anlCon">
        <div className="anlBtnCon">
          <button className="anlYouBtn" onClick={e => this.handleClickYou(e)}>You</button>
          <button className="anlRelBtn" onClick={e => this.handleClickRel(e)}>Relationship</button>
        </div>
        <h2 className="anlH2">{page === 'you'? 'User Data': 'Relationship Data'}</h2>
        { page === 'you'? displayYouSec(): displayYourRelSec()}
      </section>

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
    QServices.getAlertsData()
      .then(data => this.setState({alertData: data}, console.log(this.state.alertData)))
  }

  render() {

    const {alertData} = this.state
    console.log(alertData)
    // let allQuestions = []
    // alertData.map(alert => allQuestions.push(alert.question))
    let users = []
    alertData.map(alert => users.push(alert.first_name))
    // let uniqueQs = [...new Set(allQuestions)]
    let uniqueUsers = [...new Set(users)]
    console.log( uniqueUsers)
    
    let user1 = alertData.filter(alert => alert.first_name === uniqueUsers[0]).sort((a,b) => a.question > b.question)
    let user2 = alertData.filter(alert => alert.first_name === uniqueUsers[1]).sort((a,b) => a.question > b.question)

    let issues = []

    for(let i = 0; i < user1.length; i ++) {
      for(let j = 0; j < user2.length; j++) {
        if(user1[i].question === user2[j].question) {
          console.log(user1[i].scores.avgMood, user2[j].scores.avgMood)
          if((user1[i].scores.avgMood - user2[j].scores.avgMood) > 20 || (user1[i].scores.avgMood - user2[j].scores.avgMood) < -20 || ((user1[i].scores.avgMood + user2.scores.avgMood) / 2) < 60) {
            issues.push({
              question: user1[i].question,
              user1Mood: user1[i].scores.avgMood,
              user2Mood: user2[j].scores.avgMood,
              average: (user1[i].scores.avgMood + user2[j].scores.avgMood) / 2,
              variance: Math.abs(user1[i].scores.avgMood - user2[j].scores.avgMood)
            })
          }
        }
      }
    }
    console.log(issues)

    let displayAlerts = issues.map(issue =>
      <li key={indexOf(issue)} className="alertsLi" id={indexOf(issue)}>
        <h4>There appears to be an issue with the following:</h4>
        <span className="alertsSpan">{issue.question} </span>
        <div className="alertsBtnCon">
          { issue.variance > 20 || issue.average < 65
              ? <div className="highAlert"> </div>
              : null
          }
          { issue.variance > 15 && issue.variance <= 20
              || issue.average > 65 && issue.average < 70
              ? <div className="midAlert"> </div>
              : null
          }
          { issue.variance >= 10 && issue.variance <= 15
              || issue.average > 70 && issue.average < 75
              ? <div className="lowAlert"> </div>
              : null
          }

        </div>
      </li>
    )
    
    return (
      <section className="alertsCon">
        <ul className="alertsUL">
          {displayAlerts}
        </ul>
      </section>
    )
  }
}

export class AddIssue extends Component {
  static contextType = TeQuieroContext

  submitNewQuestion = (e) => {
    e.preventDefault()
    const { question, category } = e.target
    const newQuestion = {
      question: question.value,
      category: category.value
    }

    QServices.postNewUserQuestions(newQuestion)
      .then(res => {
        category.value = ''
        question.value = ''
        ///need to include positive submit message
      })
      

  }


  render() {

    const { categories } = this.context

    const options = categories.map(cat => <option key={cat}>{cat}</option>)
    return (
      <section className="addIssueCon">
        <form onSubmit={this.submitNewQuestion}>
          <fieldset>
            <legend className="issueLegend">Add an issue</legend>
            <div className="issueInputCon">
              <label>Category</label>
              <select name="category">
                {options}
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