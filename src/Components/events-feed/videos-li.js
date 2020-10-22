import React, { Component } from 'react'
import config from '../../config'
import TokenServices from '../../services/token-services'

export default class VideoLi extends Component {

  state = {
    source: []
  }

  componentDidMount() {
    this.handlePlay()
  }

  handlePlay = () => {
    return fetch(`${config.API_ENDPOINT}/video-stream/${this.props.videoId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.blob()
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
      <li className="videosLi">
        <p>
          Date: 
          <span>
            {new Date(this.props.date).toLocaleDateString()}
          </span>
        </p>
        <video controls src={this.state.source} type="video/mp4" />
      </li>
    )
  }
}