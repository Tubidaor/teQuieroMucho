import React, { Component } from 'react';
import QuestionFaces from './QuestionFaces';
import TeQuieroContext from '../../Context';
import { JournalServices } from '../../Services/APIServices';

export default class Questions extends Component {
  
  static contextType = TeQuieroContext





  render() {


    return (
      <QuestionFaces
        questions={
          this.props.qType === 'Opening'
          ? this.context.openingQs
          : this.context.relationshipQs
        }
        handleQSubmit={this.handleQSubmit}
        handleEndSubmit={this.handleEndSubmit}
        lastQ={
          this.props.qType === 'Opening'
          ? this.context.openingQs[this.context.openingQs.length - 2].question_id
          : this.context.relationshipQs[this.context.relationshipQs.length - 2].question_id
      }
        handlePushURL={this.props.handlePushURL}
      />
    )
  }
}