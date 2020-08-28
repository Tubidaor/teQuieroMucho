import React, { Component } from 'react';
import { ReqServices } from '../../Services/APIServices'


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
      <li>
        {request.user_first_name + " " + request.user_last_name}
        <button onClick={this.handleAccept} type="submit">Accept</button>
        <button onClick= {this.handleCancel} type="cancel">Cancel</button>
      </li>
    )

    return (
      <section>

        <h1>Add Approval</h1>
        <ul className="addAppUl">
          {displayRequests}
        </ul>
      </section>
    )
  }
}