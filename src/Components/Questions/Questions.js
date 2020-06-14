import React, { Component } from 'react';
import QuestionFaces from './QuestionFaces';
import TeQuieroContext from '../../Context';

export default class Questions extends Component {
  constructor(props){
    super(props)
    this.state = {
      qNum: 0,
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

  render() {
    let qs = this.context.openingQs
    let {qNum} = this.state

    console.log(qs)

    return (
      <QuestionFaces
      id={qs[qNum].id}
      question={qs[qNum].question}
      value1={qs[qNum].optionValue1}
      value2={qs[qNum].optionValue2}
      value3={qs[qNum].optionValue3}
      value4={qs[qNum].optionValue4}
      value5={qs[qNum].optionValue5}
      value6={qs[qNum].optionValue6}
      value7={qs[qNum].optionValue7}
      handleQSubmit={this.handleQSubmit}
    />
    )
  }
}