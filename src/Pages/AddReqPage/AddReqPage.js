import React, { Component } from 'react';
import './AddReqPage.css'
import TokenServices from '../../Services/token-services';
import NavBar from '../../Components/NavBar/NavBar';
import { ReqServices } from '../../Services/APIServices';




export default class AddRequest extends Component {

  handleAddReqSubmit = (e) => {
    e.preventDefault()
    const email = document.getElementById('addReqForm')
    ReqServices.submitRelReq(email.value)
      .then(res => console.log(res.json()))
  }
  render() {

    return (
      <div className="addReqDiv">
        <section className='addReqSec'>
          <form onSubmit={e => this.handleAddReqSubmit(e)} id="addReqForm" className="addReqForm">
            <legend className="addReqLeg">Add Request</legend>
            <div className="labelCon">
              <label className="addReqLabel">email:</label>
              <input id="addReqInput"></input>
            </div>
            <button className="addReqBtn" type='submit'>Submit</button>
          </form>
        </section>
      </div>
    )
  }
}