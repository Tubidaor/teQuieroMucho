import React, {Component} from 'react';
import { ReqServices } from '../../Services/APIServices';
import TeQuieroContext from '../../Context';


export default class AddReqForm extends Component {
  static contextType = TeQuieroContext
  // defaultProps = {
  //   location: {},
  //   history: { 
  //     push: () => {}
  //   }
  // }

  handleAddReqSubmit = (e) => {
    e.preventDefault()
    this.context.setError(null)
    const regexAnn = RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
    const regexE = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const { email, month, day, year } = e.target
    const anniversary = month.value + "/" + day.value + "/" + year.value
    console.log(regexAnn.test(anniversary), anniversary)
    if(!regexAnn.test(anniversary)) {
      this.context.setError("Please select date correctly.")
      return
    }
    console.log(regexE.test(email.value))
    if(!regexE.test(email.value)) {
      this.context.setError("Please enter a correct email address.")
      return
    }
    const relRequest = {
      partner_email: email.value,
      anniversary,
    }
    console.log(relRequest)
    ReqServices.submitRelReq(relRequest)
      .catch(e => this.context.setError(e.error))

    email.value = ''
    month.value = 'Month'
    day.value = 'Day'
    year.value = 'Year'

    // this.props.redirect()
  }

  render() {
    const bdayMonth = [
      "Month",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ]
    const year = function() {
      let currentDate = new Date(Date.now())
      let currentYear = currentDate.getFullYear()
      let yearOptions = ["Year"]
      let yearDisplay = yearOptions.reverse()
      for(let i = currentYear; i >= 1950; i--) {
        yearOptions.push(i)
      }
      return yearDisplay.map(y => <option value={y}>{y}</option>)
      
    }
    const days = function() {
      let dayOptions = ["Day"]
      for(let i = 1; i <= 31; i++) {
        let date = i
        let formatedNum = ("0" + date).slice(-2)
        dayOptions.push(formatedNum)
      }
      return dayOptions.map(day => <option value={day}>{day}</option>)
    }

  const monthDisplay = bdayMonth.map(mon => <option value={mon}> {mon} </option>)
    return (
      <div className='addReqCon'>
        <form onSubmit={this.handleAddReqSubmit} id="addReqForm" className="addReqForm">
          <legend className="addReqLeg">Add Request</legend>
          <div className="labelCon">
            <label className="addReqLabel">Email</label>
            <input name="email" id="addReqInput"></input>
          </div>
          <div className="addReqAnnCon">
            <label className="addReqLabel" htmlFor="birthday" aria-label="month">Anniversary</label>
            <select name="month" id="monthSelect">
                {monthDisplay}
            </select>
            <select name="day" id="daysSelect">
                {days()}
            </select>
            <select name="year" id="yearSelect">
                {year()}
            </select>
          </div>
          <button className="addReqBtn" type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}