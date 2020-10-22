import React, { Component } from 'react'
import QuestionFaces from './question-faces'
import TeQuieroContext from '../../context'

export default class Questions extends Component {

  static contextType = TeQuieroContext

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