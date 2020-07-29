import React, { Component } from 'react';
// import { analyticsData} from '../../Services/APIServices';
import Graphs from '../Graphs/Graphs';
import TeQuieroContext from '../../Context';
import { QServices } from '../../Services/APIServices';

export class Analytics extends Component {
  state = {
    page: 'you'
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

    const displayYouSec = () => {
      return (
        <div className="youAnlSection">
          <Graphs></Graphs>
        </div>
      )
    }

    const displayYourRelSec = () => {
      return (
        <div className="relAnlSection">
          <Graphs></Graphs>
        </div>
      )
    }


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