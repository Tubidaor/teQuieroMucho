import React, { Component } from 'react'
import { AuthServices } from '../../services/api-services'
import './reg-form.css'
import TeQuieroContext from '../../context'
import Error from '../error/error'

export default class RegForm extends Component {

  static contextType = TeQuieroContext

  componentWillUnmount() {
    this.context.setError(null)
  }

  handleRegistration = (e) => {
    e.preventDefault()
    this.context.setError(null)
    const {
      firstName,
      lastName,
      email,
      pw,
      pwConfirm,
      month,
      day,
      year,
      gender
    } = e.target

    try {
      if(!firstName.value) {
        throw new Error( 'A first name must be provided.')
      }
      if(!lastName.value) {
        throw new Error('A last name must be provided.')
      }
      if(!email.value) {
        throw new Error('An email must be provided.')
      }
      if(!pw.value) {
        throw new Error('A password must be provided.')
      }
      if(pw.value !== pwConfirm.value ) {
        throw new Error('Password does not match')
      }
      if(month.value === "Month") {
        throw new Error('A month must be provided.')
      }
      if(day.value === "Day") {
        throw new Error('A day must be provided.')
      }
      if(year.value === "Year") {
        throw new Error('A year must be provided.')
      }
      if(gender.value === "Please Choose") {
        throw new Error('Please select your gender.')
      }
      else {
        const newUser = {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          password: pw.value,
          birthday: month.value + "/" + day.value + "/" + year.value,
          gender: gender.value
      }
        
        AuthServices.registerUser(newUser)
          .then(res => {
            firstName.value = ''
            lastName.value = ''
            email.value = ''
            pw.value = ''
            pwConfirm.value = ''
            month.value = ''
            day.value = ''
            year.value = ''
            gender.value = ''
            
            this.props.onRegSuccess()
          })
          .catch(e => this.context.setError(e.error))
      }
    }
    catch(e) {
      this.context.setError(e.props)
    } 
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

    const monthDisplay = bdayMonth.map(mon =>
      <option value={mon}> {mon} </option>
    )

    const gender = [
      "Please Choose",
      "Agender",
      "Androgyne",
      "Androgynous",
      "Cis Female",
      "Cis Male",
      "Female to Male",
      "Gender Fluid",
      "Gender Nonconforming",
      "Gender Questioning",
      "Gender Variant",
      "Genderqueer",
      "Intersex",
      "Male to Female",
      "Non-binary",
      "Other",
      "Pangender",
      "Trans Female",
      "Trans Male",
      "Transfeminine",
      "Transmasculine",
      "Two-Spirit",
    ]

    let genderDisplay = gender.map(gen => <option value={gen}>{gen}</option>)

    return (
      <form className="regForm" onSubmit={this.handleRegistration}>
        <div className="regFormTopCon">
          <h2 className="regFormH2">Sign Up</h2>
          {this.context.error && <Error/> }
          <div className="firstNameCon">
            <label htmlFor="firstName">First name</label>
            <input name="firstName" id="firstName"></input>
          </div>
          <div className="lastNameCon">
            <label htmlFor="lastName">Last name</label>
            <input name="lastName" id="lastName"></input>
          </div>
          <div className="emailCon">
            <label htmlFor="email">Email</label>
            <input name="email" id="email"></input>
          </div>
          <div className="pwCon">
            <label htmlFor="pw">Password</label>
            <input name="pw" id="pw"></input>
          </div>
          <div className="pwCCon">
            <label htmlFor="pwConfirm">Confirm</label>
            <input name="pwConfirm" id="pwConfirm"></input>
          </div>
          <div className="bdCon">
            <label htmlFor="birthday" aria-label="month">Birthday</label>
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
          <div className="genderCon">
            <label htmlFor="gender" aria-label="gender">Gender</label>
            <select name="gender" id="genSelect">
              {genderDisplay}
            </select>
          </div>
        </div>
        <button className="regSubmit" type="submit">Submit</button>
      </form>
    )
  }
}