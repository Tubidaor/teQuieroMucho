import React, { Component } from 'react'
import config from '../../config'
import TokenServices from '../../services/token-services'
import AudioPlayer from 'react-h5-audio-player'


export default class AudioLi extends Component {

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
    .then(res =>
        res.blob()
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
        <li className="audioLi">
          <p>Date:
            <span>
              {new Date(this.props.date).toLocaleDateString()}
            </span>
          </p>
          <AudioPlayer src={this.state.source} type="audio/mp3"/>
        </li>
    )
  }
}