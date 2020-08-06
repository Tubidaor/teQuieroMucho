import React, { Component } from 'react';
import config from '../../config';
import TokenServices from '../../Services/token-services';



export default class AudioFeed extends Component {

  state = {
    source: []
  }

  
  componentDidMount() {
    this.handlePlay()
  }

  handlePlay = () => {
    return fetch(`${config.API_ENDPOINT}/audio-stream/${this.props.audioId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res => res.blob()
    )
    .then(source => {
      const blobURL = URL.createObjectURL(source)

      this.setState({
        source: blobURL
      })
    })
  }


  render() {
    
    return (
      <li>
        <audio controls src={this.state.source}/>
      </li>
    )
  }
}