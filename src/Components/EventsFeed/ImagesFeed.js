import React, { Component } from 'react';
import config from '../../config'
import './EventsMenu.css'



export default class ImagesFeed extends Component {

  render() {
    const staticURL = config.API_ENDPOINT
    const {images} = this.props
    // const displayImageFeed = images.map(image => <ImagesFeed key={image.id} imageURL={staticURL+"/"+ image.file_path}/>)
    const displayImages = images.map(image =>
      <li key={images.indexOf(image)} className="imageFeedLi">
        <img alt='userimage' src={staticURL+"/"+ image.file_path}/>
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