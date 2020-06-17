import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileWord} from '@fortawesome/free-regular-svg-icons';
import {faImages, faMicrophoneAlt, faVideo} from '@fortawesome/free-solid-svg-icons';
import './JournalMenu.css'

export default function JournalMenu(props) {

  return(
    <div className="journalMenuCon">
      <Link className="journalMenuItem" onClick={e => props.handleClick("journalEntry")}>New <FontAwesomeIcon icon={faFileWord}/></Link>
      <Link className="journalMenuItem" onClick={e => props.handleClick("photoEntry")}>New <FontAwesomeIcon icon={faImages}/></Link>
      <Link className="journalMenuItem" onClick={e => props.handleClick("audioEntry")}>New <FontAwesomeIcon icon={faMicrophoneAlt}/></Link>
      <Link className="journalMenuItem">New <FontAwesomeIcon icon={faVideo}/></Link>

    </div>
  )
}