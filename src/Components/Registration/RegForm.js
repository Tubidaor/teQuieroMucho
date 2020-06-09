import React, { Component } from 'react';
import './RegForm.css';

export default class RegForm extends Component {

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

  const gender = [
    "Agender",
    "Androgyne",
    "Androgynous",
    "Bigender",
    "Cis",
    "Cisgender",
    "Cis Female",
    "Cis Male",
    "Cis Man",
    "Cis Woman",
    "Cisgender Female",
    "Cisgender Male",
    "Cisgender Man",
    "Cisgender Woman",
    "Female to Male",
    "FTM",
    "Gender Fluid",
    "Gender Nonconforming",
    "Gender Questioning",
    "Gender Variant",
    "Genderqueer",
    "Intersex",
    "Male to Female",
    "MTF",
    "Neither",
    "Neutrois",
    "Non-binary",
    "Other",
    "Pangender",
    "Trans",
    "Trans*",
    "Trans Female",
    "Trans* Female",
    "Trans Male",
    "Trans* Male",
    "Trans Man",
    "Trans* Man",
    "Trans Person",
    "Trans* Person",
    "Trans Woman",
    "Trans* Woman",
    "Transfeminine",
    "Transgender",
    "Transgender Female",
    "Transgender Male",
    "Transgender Man",
    "Transgender Person",
    "Transgender Woman",
    "Transmasculine",
    "Transsexual",
    "Transsexual Female",
    "Transsexual Male",
    "Transsexual Man",
    "Transsexual Person",
    "Transsexual Woman",
    "Two-Spirit",
  ]

  let genderDisplay = gender.map(gen => <option value={gen}>{gen}</option>)

    return (
      <section className="regSection">
        <h2 className="regFormH2">Sign Up</h2>
        <form>
          <div className="emailCon">
            <label htmlFor="emailLab">Email</label>
            <input name="emailLab" id="emailLab"></input>
          </div>
          <div className="pwCon">
            <label htmlFor="pwLab">Password</label>
            <input name="pwLab" id="pwLab"></input>
          </div>
          <div className="pwCCon">
            <label htmlFor="pwConfirm">Confirm</label>
            <input name="pwConfirm" id="pwConfirm"></input>
          </div>
          <div className="bdCon">
            <label htmlFor="birthday" aria-label="month">Birthday</label>
            <select name="birthday" id="monthSelect">
                {monthDisplay}
            </select>
            <select name="birthday" id="daysSelect">
                {days()}
            </select>
            <select name="birthday" id="yearSelect">
                {year()}
            </select>
          </div>
          <div className="genderCon">
            <label htmlFor="gender" aria-label="gender">Gender</label>
            <select name="gender" id="genSelect">
              {genderDisplay}
            </select>
          </div>
          <button className="regSubmit" type="submit">Submit</button>
        </form>
      </section>
    )
  }
}