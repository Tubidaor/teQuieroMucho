import React, { Component } from 'react'
import { QServices } from './services/api-services.js'

const TeQuieroContext = React.createContext({
  error: null,
  state: {},
  setError: () => {},
  setOpeningQuestions: () => {},
  setRelationshipQuestions: () => {},
})

export default TeQuieroContext

export class TeQuieroProvider extends Component {

  state = {
    error: null,
    openingQs: QServices.getOpeningDataFromStorage(),
    relationshipQs: QServices.getRelDataFromStorage(),
  }

  setError = (error) => {
    this.setState({
      error
    })
  }

  setOpeningQuestions = async (openingQs) => {
    this.setState({
      openingQs
    })
  }

  setRelationshipQuestions = async (relationshipQs) => {
    this.setState({
      relationshipQs
    })
  }

  render() {
    
    const value = {
      error: this.state.error,
      state: this.state,
      setError: this.setError,
      setOpeningQuestions: this.setOpeningQuestions,
      setRelationshipQuestions: this.setRelationshipQuestions,
    }

    return(
      <TeQuieroContext.Provider value={value}>
        {this.props.children}
      </TeQuieroContext.Provider>

    )
  }


}