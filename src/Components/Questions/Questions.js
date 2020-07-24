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

  constructor(props) {
    super(props)
    this.state = {
      questions: 'Opening',
    }
  }


  componentDidMount() {
    this.setState({
      questions: this.props.qType
    })
  }



  questions = () => {
    if(this.state.questions === "Opening") {
      return this.context.openingQs
    }
    if(this.state.questions === "Relationship") {
      return this.context.relationshipQs
    }
  }

  lastQuestion = () => {
    if(this.state.questions === "Opening") {
      let lastQ = this.context.openingQs.length - 2
      return this.context.openingQs[lastQ].id
    }
    if(this.state.questions === "Relationship") {
      let lastQ = this.context.relationshipQs.length - 2
      return  this.context.relationshipQs[lastQ].id
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
        lastQ={lastQ}
        handlePushToHome={this.props.handlePushToHome}

      />
    )
  }
}