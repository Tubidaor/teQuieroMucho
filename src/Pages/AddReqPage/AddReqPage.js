import React, { Component } from 'react';
import './AddReqPage.css'
import AddReqForm from '../../Components/AddRequest/AddReqForm';
import AddApproval from '../../Components/AddRequest/AddApproval';




export default class AddReqPage extends Component {


  
  render() {


    return (
      <div className="addReqDiv">
        <AddReqForm></AddReqForm>
        <AddApproval></AddApproval>
      </div>
    )
  }
}