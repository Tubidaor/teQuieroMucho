import React, { Component } from 'react';
import './Error.css'
import TeQuieroContext from '../../Context';


export default class Error extends Component {
  static contextType = TeQuieroContext

  render() {
    const { error } = this.context
    return (
      <div className="errorCon">
          <p className="errorMessage">{error}</p>
      </div>
    )
  }
}