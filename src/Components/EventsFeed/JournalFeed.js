import React from 'react'


export default function JournalFeed(props) {

  return (
    <li>
      <div>
        <p>{props.date}</p>
        <br></br>
        <p>{props.journal}</p>
      </div>
    </li>
  )
}