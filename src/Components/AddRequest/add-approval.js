import React, { Component } from 'react'
import './add-request.css'


export default class AddApproval extends Component {
  
  render() {
    const { requests } = this.props
    const displayRequests = requests.map(request =>
      <li className="addAppLi">
          <span>{request.user_first_name + " " + request.user_last_name}</span>
          <div className="addAppBtnCon">
            <button className="addAppBtn" onClick={e => this.props.handleAccept(request.user_id, request.anniversary)} type="submit">Accept</button>
            <button className="addAppBtn" onClick= {e => this.props.handleCancel(request.user_id)} type="cancel">Cancel</button>
          </div>
      </li>
    )

    return (
      <div className="addAppCon">
        <h4>Add Approval</h4>
        <ul className="addAppUl">
          {displayRequests}
        </ul>
      </div>
    )
  }
}