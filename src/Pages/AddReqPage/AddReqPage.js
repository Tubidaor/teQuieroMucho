import React, { Component } from 'react';
import './AddReqPage.css'
import AddReqForm from '../../Components/AddRequest/AddReqForm';
import AddApproval from '../../Components/AddRequest/AddApproval';
import Error from '../../Components/Error/Error';
import TeQuieroContext from '../../Context';
import { ReqServices } from '../../Services/APIServices'




export default class AddReqPage extends Component {

static contextType = TeQuieroContext

state = {
  requests: []
}

componentDidMount() {
  ReqServices.getRelRequests()
    .then(data =>
      this.setState({
        requests: [data]
      }, console.log(this.state.requests))
    )
   
}
  
handleCancel = (user_id) => {
  ReqServices.deleteRequest()
  this.setState({
    requests:  this.state.requests.filter(req => {return req.user_id != user_id})

  })
  

}
  render() {
    
    
    return (
      <section className="addReqSection">
        {this.context.error && <Error error={this.context.error}/>}
        <AddReqForm redirect={this.props.redirect}/>
        <AddApproval requests={this.state.requests} handleCancel={this.handleCancel}/>
        
      </section>
    )
  }
}