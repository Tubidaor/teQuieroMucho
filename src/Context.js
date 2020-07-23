import React, { Component } from 'react';
import { alerts, categories } from './ContextData.js'

const TeQuieroContext = React.createContext({
  stateofMind: null,
  rQuality: null,
  error: null,
  openingQs: '',
  relationshipQs: [],
  userQs: [],
  alerts: [],
  categories: [],
  setStateofMind: () => {},
  setError: () => {},
  setOpeningQuestions: () => {},
  setRelationshipQuestions: () => {},
  setUserQuestions: () => {}
})

export default TeQuieroContext

export class TeQuieroProvider extends Component {
  state = {
    stateofMind: "Happy",
    rQuality: "Happy",
    error: null,
    openingQs: '',
    relationshipQs: [],
    userQs: [],
    alerts: alerts,
    categories: categories,
  }

  setStateofMind = (stateofMind) => {
    this.setState({ stateofMind})
  }
  setError = (error) => {
    this.setState({
      error
    }, () => console.log(this.state.error))
  }

  setOpeningQuestions = (openingQs) => {
    this.setState({
      openingQs
    }, () => console.log(this.state.openingQs))
    
  }

  setRelationshipQuestions = (relationshipQs) => {
    this.setState({relationshipQs}, () => console.log(this.state.relationshipQs))
  }
  setUserQuestions = (userQs) => {
    this.setState({userQs})
  }

  render() {
    
    const value = {
      stateofMind: this.state.stateofMind,
      rQuality: this.state.rQuality,
      error: this.state.error,
      openingQs: this.state.openingQs,
      relationshipQs: this.state.relationshipQs,
      userQs: this.state.userQs,
      alerts: this.state.alerts,
      categories: this.state.categories,
      setStateofMind: this.setStateofMind,
      setError: this.setError,
      setOpeningQuestions: this.setOpeningQuestions,
      setRelationshipQuestions: this.setRelationshipQuestions,
      setUserQuestions: this.setUserQuestions
    }
    return(
      <TeQuieroContext.Provider value={value}>
        {this.props.children}
      </TeQuieroContext.Provider>

    )
  }


}