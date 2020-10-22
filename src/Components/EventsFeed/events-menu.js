import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileWord} from '@fortawesome/free-regular-svg-icons'
import {
  faImages,
  faMicrophoneAlt,
  faVideo
} from '@fortawesome/free-solid-svg-icons'
import './events-menu.css'




export default function EventsMenu(props) {

  return (
    <ul className="eventsMenuCon">
      <li className="eventMenuItem" onClick={e => props.handleClick("Journal")}>
        <span>
          <FontAwesomeIcon icon={faFileWord}/>
        </span>
        <span>
          Journals
        </span>
      </li>
      <li className="eventMenuItem" onClick={e => props.handleClick("Images")}>
        <span>
          <FontAwesomeIcon icon={faImages}/>
        </span>
        <span>
          Images
        </span>
      </li>
      <li className="eventMenuItem" onClick={e => props.handleClick("Audio")}>
        <span>
          <FontAwesomeIcon icon={faMicrophoneAlt}/>
        </span>
        <span>
          Audio
        </span>
      </li>
      <li className="eventMenuItem" onClick={e => props.handleClick("Video")}>
        <span>
          <FontAwesomeIcon icon={faVideo}/>
        </span>
        <span>
          Video
        </span>
      </li>
    </ul>
  )
}