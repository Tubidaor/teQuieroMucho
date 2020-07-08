import React, { Component } from 'react';
import QuestionFaces from './QuestionFaces';
import TeQuieroContext from '../../Context';
import { JournalServices } from '../../Services/APIServices';

export default class Questions extends Component {

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }
  constructor(props){
    super(props)
    this.state = {
      qNum: 0,
      questions: props.qType,
    }
  }

  static contextType = TeQuieroContext

  handleQSubmit = (e) => {
    e.preventDefault()
    JournalServices.submitAnswer('answer')

    this.setState(
      {
        qNum: this.state.qNum + 1
      }
    )
  }

  handleEndSubmit = (e) => {
    e.preventDefault()
    JournalServices.submitAnswer('lastAnswer')
    
    this.setState({
      qNum: 0
    })

    this.props.handlePushToHome()

  }

  questions = () => {
    if(this.state.questions === "opening") {
      return this.context.openingQs
    }
    if(this.state.questions === "relationship") {
      return this.context.relationshipQs
    }
  }

  lastQuestion = () => {
    if(this.state.questions === "opening") {
      let lastQ = this.context.openingQs.length - 2
      return this.context.openingQs[lastQ].id
    }
    if(this.state.questions === "relationship") {
      let lastQ = this.context.relationshipQs.length - 2
      return  this.context.relationshipQs[lastQ].id
    }
  }
  render() {

    let {qNum} = this.state
    let qs = this.questions()
    let lastQ = this.lastQuestion()

    return (
      <QuestionFaces
        currentQ={qNum}
        questions={qs}
        handleQSubmit={this.handleQSubmit}
        handleEndSubmit={this.handleEndSubmit}
        lastQ={lastQ}
      />
    )
  }
}