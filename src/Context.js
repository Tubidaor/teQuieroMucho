import React, { Component } from 'react';

const TeQuieroContext = React.createContext({
  stateofMind: null,
  rQuality: null,
  error: null,
  setStateofMind: () => {},
})

export default TeQuieroContext

export class TeQuieroProvider extends Component {
  state = {
    stateofMind: "Happy",
    rQuality: "Happy",
    error: null,
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
    }
    return(
      <TeQuieroContext.Provider value={value}>
        {this.props.children}
      </TeQuieroContext.Provider>

    )
  }


}