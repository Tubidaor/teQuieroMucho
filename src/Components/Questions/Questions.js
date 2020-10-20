import React, { Component } from 'react';
import QuestionFaces from './QuestionFaces';
import TeQuieroContext from '../../Context';
import { QServices } from '../../Services/APIServices';

export default class Questions extends Component {
  
  static contextType = TeQuieroContext

  

  componentWillUnmount() {
    this.context.setOpeningQuestions(QServices.getOpeningDataFromStorage())
    this.context.setRelationshipQuestions(QServices.getRelDataFromStorage())
  }


  render() {
    const {openingQs, relationshipQs } = this.context.state
    return (
      <QuestionFaces
        questions={
          this.props.qType === 'Opening'
          ? openingQs
          : relationshipQs
        }
        handleQSubmit={this.handleQSubmit}
        handleEndSubmit={this.handleEndSubmit}
        lastQ={
          this.props.qType === 'Opening'
          ? openingQs[openingQs.length - 1].question_id
          : relationshipQs[relationshipQs.length - 1].question_id
      }
        handlePushURL={this.props.handlePushURL}
      />
    )
  }
}