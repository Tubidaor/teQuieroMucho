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
  
  static contextType = TeQuieroContext

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     questions: this.props.qType,
  //   }
  // }
  
  questions = () => {
    if(this.props.qType === "Opening") {
      return this.context.openingQs
    }
    if(this.props.qType === "Relationship") {
      return this.context.relationshipQs
    }
  }

  lastQuestion = () => {
    if(this.props.qType === "Opening") {
      let lastQ = this.context.openingQs.length - 2
      return this.context.openingQs[lastQ].question_id
    }
    
    if(this.props.qType === "Relationship") {
      let lastQ = this.context.relationshipQs.length - 2
      return  this.context.relationshipQs[lastQ].question_id
    }
  }
  render() {



    const qs = this.questions()
    const lastQ = this.lastQuestion()
    

    return (
      <QuestionFaces
        questions={qs}
        handleQSubmit={this.handleQSubmit}
        handleEndSubmit={this.handleEndSubmit}
        lastQ={lastQ ? lastQ : []}
        handlePushURL={this.props.handlePushURL}
      />
    )
  }
}