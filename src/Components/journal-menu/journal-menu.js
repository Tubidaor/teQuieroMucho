import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileWord} from '@fortawesome/free-regular-svg-icons'
import {faImages, faMicrophoneAlt, faVideo} from '@fortawesome/free-solid-svg-icons'
import './journal-menu.css'

export default function JournalMenu(props) {

  return(
    <ul className="journalMenuCon">
      <li className="journalMenuItem" onClick={e => props.handleClick("journalEntry")}>
        <span>
          <FontAwesomeIcon icon={faFileWord}/>
        </span>
        <span>
          Journal
        </span>
      </li>
      <li className="journalMenuItem" onClick={e => props.handleClick("fileEntry")}>
        <span>
          <FontAwesomeIcon icon={faImages}/>
        </span>
        <span>
          File
        </span>
      </li>
      <li className="journalMenuItem" onClick={e => props.handleClick("audioEntry")}>
        <span>
          <FontAwesomeIcon icon={faMicrophoneAlt}/>
        </span>
        <span>
          Audio
        </span>
      </li>
      <li className="journalMenuItem" onClick={e => props.handleClick("videoEntry")}>
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