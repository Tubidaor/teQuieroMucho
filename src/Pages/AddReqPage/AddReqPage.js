import React, { Component } from 'react';
import './AddReqPage.css'
import AddReqForm from '../../Components/AddRequest/AddReqForm';
import AddApproval from '../../Components/AddRequest/AddApproval';
import Error from '../../Components/Error/Error';
import TeQueiroContext from '../../Context';
import TeQuieroContext from '../../Context';




export default class AddReqPage extends Component {

static contextType = TeQuieroContext
  
  render() {


    return (
      <section className="addReqSection">
        {this.context.error && <Error error={this.context.error}/>}
        <AddReqForm></AddReqForm>
        <AddApproval></AddApproval>
      </section>
    )
  }
}