import React, { Component } from 'react';
// import { analyticsData} from '../../Services/APIServices';
import Graphs from '../Graphs/Graphs';
import TeQuieroContext from '../../Context';
import { QServices } from '../../Services/APIServices';

export class Analytics extends Component {
  state = {
    page: 'you',
    userData: [],
    relData: []
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


  render() {
    // const data = analyticsData
    const userQuestions = []
    const {userData} = this.state
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
      
      // return begYear
      return {x : [new Date(begYear, begMonth, begDay), new Date(endYear, endMonth, endDay)]}
    }
    // { key: new Date(1982, 1, 1), b: 125 },
    
    const userJoyData = []
    userData.map(data => userJoyData.push({key: new Date(data.date_created), b: data.joy } ))
    if(userQuestionData.length > 0) {
      for(let i = 0; i < userQuestionData.length; i++) {
        console.log(userQuestionData[i].question)
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
      console.log(userQuestionData)
    }
  
    const displayYouSec = () => {
      return (
        <div className="youAnlSection">
          <Graphs zoomDomain={zoomDomain} userData={userQuestionData}></Graphs>
        </div>
      )
    }

    const displayYourRelSec = () => {
      return (
        <div className="relAnlSection">
          <Graphs zoomDomain={zoomDomain}></Graphs>
        </div>
      )
    }
    console.log(userQuestionData)
    console.log(userQuestionData[0])

    const { page } = this.state
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

  render() {
    const { alerts } = this.context

    let displayAlerts = alerts.map(alert =>
      <li key={alert.id} className="alertsLi" id={alert.id}>
        <span className="alertsSpan">{alert.alert} </span>
        <div className="alertsBtnCon">
          <button>Dismiss</button>
          <button>Escalate</button>
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