import React, { Component } from 'react'
import './add-req-page.css'
import AddReqForm from '../../components/add-request/add-req-form'
import AddApproval from '../../components/add-request/add-approval'
import Error from '../../components/error/error'
import TeQuieroContext from '../../context'
import { ReqServices } from '../../services/api-services'

export default class AddReqPage extends Component {

  static contextType = TeQuieroContext

  state = {
    requests: []
  }

  componentDidMount() {
    this.context.setError(null)
    ReqServices.getRelRequests()
      .then(data =>
        this.setState({
          requests: [data]
        })
      )
  }

  handleAccept = (user_id, anniversary) => {
    const approvedRel = {
      partner_id: user_id,
      anniversary
    }

    ReqServices.acceptRequest(approvedRel)
    this.handleCancel(user_id)   
  }

  handleCancel = (user_id) => {
    ReqServices.deleteRequest()
    this.setState({
      requests:  this.state.requests.filter(req =>  {
        return req.user_id !== user_id
      })
    })
  }

  handleAddReqSubmit = (e) => {
    e.preventDefault()
    this.context.setError(null)
    const regexAnn = RegExp(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
    )
    const regexE = RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    const { email, month, day, year } = e.target
    const anniversary = month.value + "/" + day.value + "/" + year.value
    if(!regexAnn.test(anniversary)) {
      this.context.setError("Please select date correctly.")
      return
    }
    if(!regexE.test(email.value)) {
      this.context.setError("Please enter a correct email address.")
      return
    }

    const relRequest = {
      partner_email: email.value,
      anniversary,
    }

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
        <AddReqForm
          handleSubmit={this.handleAddReqSubmit}
          handlePrompt={this.handlePrompt}
        />
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