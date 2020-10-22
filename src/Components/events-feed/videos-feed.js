import React, { Component } from 'react'
import VideoLi from './videos-li'

export default class VideoFeed extends Component {
  
  render() {
    const { videos } = this.props
    const displayVideos = videos.map(video =>
      <VideoLi
        key={videos.indexOf(video)}
        date={video.date_created}
        videoId={video.entry_id}
      />
    )

    return (
      <div className="videosFeedCon">
        <ul className="videosUl">
          { displayVideos }
        </ul>
      </div>
    )
  }
}