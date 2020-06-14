import React, { Component } from 'react';
import { topics, introQuestions } from './ContextData.js'

const TeQuieroContext = React.createContext({
  stateofMind: null,
  rQuality: null,
  error: null,
  setStateofMind: () => {},
  openingQs: [],
  relationshipQ: [],

})

export default TeQuieroContext

export class TeQuieroProvider extends Component {
  state = {
    stateofMind: "Happy",
    rQuality: "Happy",
    error: null,
    openingQs: introQuestions,
    relationshipQ: topics,
  }

  setStateofMind = (stateofMind) => {
    this.setState({ stateofMind})
  }

  render() {
    const value = {
      stateofMind: this.state.stateofMind,
      rQuality: this.state.rQuality,
      error: this.state.error,
      setStateofMind: this.setStateofMind,
      openingQs: this.state.openingQs,
      relationshipQ: this.state.relationshipQ,
    }
    return(
      <TeQuieroContext.Provider value={value}>
        {this.props.children}
      </TeQuieroContext.Provider>

    )
  }


}