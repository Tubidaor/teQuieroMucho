import React, { Component } from 'react';
import QuestionFaces from './QuestionFaces';
import TeQuieroContext from '../../Context';

export default class Questions extends Component {
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
    // if(this.state.qNum === introQuestions.length-1) {
    //   //send user to home screen and submit answer/  
    // }
    this.setState(
      {
        qNum: this.state.qNum + 1
      }
    )
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
        lastQ={lastQ}
      />
    )
  }
}