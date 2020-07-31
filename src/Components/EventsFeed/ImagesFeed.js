import React, { Component } from 'react';



export default class ImagesFeed extends Component {

  render() {
    console.log(this.props.imageURL)
    return (
      <li>
        <img alt='userimage' src={this.props.imageURL}/>
        
      </li>
    )
  }
}