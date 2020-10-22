import React, { Component } from 'react'
import config from '../../config'
import './events-menu.css'



export default class ImagesFeed extends Component {

  render() {
    const staticURL = config.API_ENDPOINT
    const {images} = this.props
    const displayImages = images.map(image =>
      <li key={images.indexOf(image)} className="imageFeedLi">
        <img
          className="imgFeed"
          alt='userimage'
          src={staticURL+"/"+ image.file_path}
        />
      </li>
    )

    return (
      <div className="imageFeedCon">
        <ul className="imageFeedUl">
          {displayImages}
        </ul>
      </div>
    )
  }
}