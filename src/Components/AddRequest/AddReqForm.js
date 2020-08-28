import React, {Component} from 'react';
import { ReqServices } from '../../Services/APIServices';


export default class AddReqForm extends Component {
  handleAddReqSubmit = (e) => {
    e.preventDefault()
    const { email, month, day, year } = e.target
    const relRequest = {
      partner_email: email.value,
      anniversary: month.value + "/" + day.value + "/" + year.value
    }
    console.log(relRequest)
    ReqServices.submitRelReq(relRequest)
      .then(rel => console.log(rel))
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
      <section className='addReqSec'>
        <form onSubmit={this.handleAddReqSubmit} id="addReqForm" className="addReqForm">
          <legend className="addReqLeg">Add Request</legend>
          <div className="labelCon">
            <label className="addReqLabel">Email</label>
            <input name="email" id="addReqInput"></input>
          </div>
          <div className="addReqAnnCon">
            <label htmlFor="birthday" aria-label="month">Anniversary</label>
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
      </section>
    )
  }
}