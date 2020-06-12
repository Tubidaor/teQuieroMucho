import React from 'react';
import './NavBar.css'

export default function NavBar(props) {

  let bodyParts = function(number) {
    let section = []
    for(let i = 1; i <= number; i++) {
      section.push(<li className={`navLi${i}`}></li>)
    }
    return section
  }
  return (
    <nav className="homeNav">
      <div className="menuCon">
        <ul className="figureConLeft">
          {bodyParts(7)}
        </ul>
        <ul className="figureConRight">
          {bodyParts(7)}
        </ul>
      </div>
    </nav>
  )
}