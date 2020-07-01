import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileWord} from '@fortawesome/free-regular-svg-icons';
import {faImages, faMicrophoneAlt, faVideo} from '@fortawesome/free-solid-svg-icons';
import './JournalMenu.css'

export default function JournalMenu(props) {

  return(
    <div className="journalMenuCon">
      <Link className="journalMenuItem" onClick={e => props.handleClick("journalEntry")}>
        <span>
          <FontAwesomeIcon icon={faFileWord}/>
        </span>
        <span>
          Journal
        </span>
      </Link>
      <Link className="journalMenuItem" onClick={e => props.handleClick("fileEntry")}>
        <span>
          <FontAwesomeIcon icon={faImages}/>
        </span>
        <span>
          File
        </span>
      </Link>
      <Link className="journalMenuItem" onClick={e => props.handleClick("audioEntry")}>
        <span>
          <FontAwesomeIcon icon={faMicrophoneAlt}/>
        </span>
        <span>
          Audio
        </span>
      </Link>
      <Link className="journalMenuItem" onClick={e => props.handleClick("videoEntry")}>
        <span>
          <FontAwesomeIcon icon={faVideo}/>
        </span>
        <span>
          Video
        </span>
      </Link>
    </div>
  )
}