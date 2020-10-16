import React, { Component } from 'react';
import { ReqServices } from '../../Services/APIServices'
import './AddRequest.css'


export default class AddApproval extends Component {
 

  handleAccept = (e) => {
    const { user_id, anniversary } = this.props.request

    const approvedRel = {
      partner_id: user_id,
      anniversary
    }
    console.log(approvedRel)
    ReqServices.acceptRequest(approvedRel)
      .then(data => 
        ReqServices.deleteRequest()
      )

      
  }

  

  render() {

    const { requests } = this.props
    const displayRequests = requests.map(request =>
      <li className="addAppLi">
          <span>{request.user_first_name + " " + request.user_last_name}</span>
          <div className="addAppBtnCon">
            <button className="addAppBtn" onClick={this.handleAccept} type="submit">Accept</button>
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