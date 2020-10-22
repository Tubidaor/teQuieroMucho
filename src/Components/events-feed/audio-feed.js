import React, { Component } from 'react'
import AudioLi from './audio-li'

export default class AudioFeed extends Component {

  render() {
    const {audio} = this.props
    const displayAudio = audio.map(list =>
      <AudioLi
        key={audio.indexOf(list)}
        date={list.date_created}
        audioId={list.entry_id}
      />
    )

    return (
        <div className="audioFeedCon">
          <ul className="audioUl">
            {displayAudio}
          </ul>
        </div>
    )
  }
}