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
    console.log(this.state.qNum)
  }

  questions = () => {
    if(this.state.questions === "opening") {
      return this.context.openingQs
    }
    if(this.state.questions === "relationship") {
      return this.context.relationshipQs
    }
  }
  render() {

    let {qNum} = this.state
    let qs = this.questions()

    return (
      <QuestionFaces
        id={qs[qNum].id}
        question={qs[qNum].question}
        handleQSubmit={this.handleQSubmit}
      />
    )
  }
}