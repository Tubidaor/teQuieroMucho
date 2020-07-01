import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';

export default function NavBar(props) {

  const bodyParts = function(number) {
    let section = []
    for(let i = 1; i <= number; i++) {
      section.push(<li className={`navLi${i}`}></li>)
    }
    return section
  }

  const expand = function() {
    console.log("expandrand")
    document.getElementById("menuExpand").classList.toggle("expand")
    document.getElementById("menuListExpand").classList.toggle("expandList")
  }

  const menu = [
    "Journal",
    "Relationship",
  ]



  let menuDisplay = function(menu) {
    let section = []
    for(let i = 0; i <= menu.length; i++) {
      section.push(<li className={`menuLi${i}`}><Link onClick={e => props.handleClick(menu[i])}>{menu[i]}</Link></li>)
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