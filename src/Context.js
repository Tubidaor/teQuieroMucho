import React, { Component } from 'react';
import { alerts, introQuestions, relationshipQuestions, categories } from './ContextData.js'

const TeQuieroContext = React.createContext({
  stateofMind: null,
  rQuality: null,
  error: null,
  setStateofMind: () => {},
  setError: () => {},
  openingQs: [],
  relationshipQs: [],
  alerts: [],
  categories: []
})

export default TeQuieroContext

export class TeQuieroProvider extends Component {
  state = {
    stateofMind: "Happy",
    rQuality: "Happy",
    error: null,
    openingQs: introQuestions,
    relationshipQs: relationshipQuestions,
    alerts: alerts,
    categories: categories,
  }

  setStateofMind = (stateofMind) => {
    this.setState({ stateofMind})
  }
  setError = (error) => {
    this.setState({
      error
    })
  }
  render() {
    const value = {
      stateofMind: this.state.stateofMind,
      rQuality: this.state.rQuality,
      error: this.state.error,
      setStateofMind: this.setStateofMind,
      setError: this.setError,
      openingQs: this.state.openingQs,
      relationshipQs: this.state.relationshipQs,
      alerts: this.state.alerts,
      categories: this.state.categories
    }
    return(
      <TeQuieroContext.Provider value={value}>
        {this.props.children}
      </TeQuieroContext.Provider>

    )
  }


}