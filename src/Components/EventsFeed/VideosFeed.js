import React, { Component } from 'react';
import config from '../../config';
import TokenServices from '../../Services/token-services';

export default class VideoFeed extends Component {

  state = {
    source: []
  }
  componentDidMount() {
    // this.handlePlay()
  }
  handlePlay = () => {
    fetch(`${config.API_ENDPOINT}/video-stream/${this.props.videoId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res =>
      console.log(res)
      // (!res.ok)
      //   ? res.json().then(e => Promise.reject(e))
      //   : res.blob()
    )
    .then(source => {

      const blobURL = URL.createObjectURL(source)
      this.setState({
        source: blobURL
      }, console.log(this.state.source))
    })
  }
  
  render() {
    
    return (
      <li>
        <video controls src={'http://localhost:8000/api/video-stream'} />
      </li>
    )
  }
}