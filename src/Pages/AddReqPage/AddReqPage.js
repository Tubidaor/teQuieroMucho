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

handleAccept = (user_id, anniversary) => {

  const approvedRel = {
    partner_id: user_id,
    anniversary
  }
  console.log(approvedRel)
  ReqServices.acceptRequest(approvedRel)

  this.handleCancel(user_id)   
    
}

handleCancel = (user_id) => {
  ReqServices.deleteRequest()
  this.setState({
    requests:  this.state.requests.filter(req => {return req.user_id != user_id})

  })
  

}

handleAddReqSubmit = (e) => {
  e.preventDefault()
  this.context.setError(null)
  const regexAnn = RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
  const regexE = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  const { email, month, day, year } = e.target
  const anniversary = month.value + "/" + day.value + "/" + year.value
  console.log(regexAnn.test(anniversary), anniversary)
  if(!regexAnn.test(anniversary)) {
    this.context.setError("Please select date correctly.")
    return
  }
  console.log(regexE.test(email.value))
  if(!regexE.test(email.value)) {
    this.context.setError("Please enter a correct email address.")
    return
  }
  const relRequest = {
    partner_email: email.value,
    anniversary,
  }
  console.log(relRequest)
  ReqServices.submitRelReq(relRequest)
    .then(res => {
        const prompt = document.getElementById('subPrompt')
    
        prompt.style.display = 'flex'
      
    })
    .catch(e => this.context.setError(e.error))

  email.value = ''
  month.value = 'Month'
  day.value = 'Day'
  year.value = 'Year'

  
}
handlePrompt() {
  const prompt = document.getElementById('subPrompt')

  prompt.style.display = 'none'
}

  render() {
    
    
    return (
      <section className="addReqSection">
        {this.context.error && <Error error={this.context.error}/>}
        <AddReqForm handleSubmit={this.handleAddReqSubmit} handlePrompt={this.handlePrompt}/>
        <AddApproval
          requests={this.state.requests}
          handleCancel={this.handleCancel}
          handleAccept={this.handleAccept}
        />
        <div className="submitNotice" id="subPrompt">
          <h4>Your relationship request has been submitted.</h4>
          <button
            className="submitPromptBtn"
            type="button"
            onClick={this.handlePrompt}
          >
            Got It
          </button>
        </div>
        
      </section>
    )
  }
}