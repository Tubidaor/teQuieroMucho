import React, { Component } from 'react';


export default class AudioFeed extends Component {


  
  componentDidMount() {
    const { blob } = this.props
    this.blobURL = URL.createObjectURL(blob)
  }

  render() {
    
    return (
      <li>
        <audio controls src={this.blobURL}/>
      </li>
    )
  }
}