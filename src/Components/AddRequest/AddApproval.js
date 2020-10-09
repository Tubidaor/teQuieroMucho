import React, { Component } from 'react';
import { ReqServices } from '../../Services/APIServices'
import './AddRequest.css'


export default class AddApproval extends Component {

  state = {
    requests: []
  }

  componentDidMount() {
    ReqServices.getRelRequests()
      .then(data =>
        this.setState({
          requests: [data]
        })
      )
  }

  handleAccept = (e) => {
    console.log(this.state.requests)
    const { user_id, anniversary } = this.state.requests[0]

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

  handleCancel = (e) => {
    ReqServices.deleteRequest()
  }

  render() {

    const relRequests = this.state.requests
    console.log(relRequests)

    const displayRequests = relRequests.map(request =>
      <li className="addAppLi">
        <span>{request.user_first_name + " " + request.user_last_name}</span>
        <div className="addAppBtnCon">
          <button className="addAppBtn" onClick={this.handleAccept} type="submit">Accept</button>
          <button className="addAppBtn" onClick= {this.handleCancel} type="cancel">Cancel</button>
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