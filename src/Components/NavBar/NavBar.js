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

  let expand = function() {
    console.log("expandrand")
    document.getElementById("menuExpand").classList.toggle("expand")
    document.getElementById("menuListExpand").classList.toggle("expandList")
  }

  const menu = [
    "Tournal",
    "Topics",
    "Memories",
    "Language",
    "Grievances",
  ]

  let menuDisplay = function(menu) {
    let section = []
    for(let i = 1; i <= menu.length; i++) {
      section.push(<li className={`menuLi${i}`}>{menu[i]}</li>)
    }
    return section
  }


  return (
    <nav className="homeNav" id="menuExpand">
      <div className="menuCon"  onClick={expand}>
        <ul className="figureConLeft">
          {bodyParts(7)}
        </ul>
        <ul className="figureConRight">
          {bodyParts(7)}
        </ul>
      </div>
      <div className="menuListCon" id="menuListExpand">
        <ul className="ulListCon">
          {menuDisplay(menu)}
        </ul>
      </div>
    </nav>
  )
}