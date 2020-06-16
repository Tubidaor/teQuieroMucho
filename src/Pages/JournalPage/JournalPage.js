import React, { Component } from 'react';

export default class JournalPage extends Component {

  render() {
    let dt = new Date()
    let mm = dt.getMonth() + 1
    let dd = dt.getDate()
    let yy = dt.getFullYear()
    let todaysDate = mm + "-" + dd + "-" + yy

    return (
      <div className="journalCon">
        <h3>Today's Date: {todaysDate}</h3>
      </div>
    )
  }
}