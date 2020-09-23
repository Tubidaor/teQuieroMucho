import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

export default function NavBar(props) {

  const bodyParts = function(number) {
    let section = []
    for(let i = 1; i <= number; i++) {
      section.push(<li key={i} className={`navLi${i}`}></li>)
    }
    return section
  }

  const expand = function() {
    console.log("expandrand")
    document.getElementById("menuExpand").classList.toggle("expand")
    document.getElementById("menuListExpand").classList.toggle("expandList")
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
        <div className="menuConForUl">
          <ul className="ulListCon">
            <li className={`menuLiHome`}><button className="navBtn" onClick={e => props.handleClick('Home')}>Home</button></li>
            <li className={`menuLiJournal`}><button className="navBtn" onClick={e => props.handleClick('Journal')}>Journal</button></li>
            <li className={`menuLiRel`}><button className="navBtn" onClick={e => props.handleClick('Relationship')}>Relationship</button></li>
            <li className={`menuLiAdd`}><button className="navBtn" onClick={e => props.handleClick('AddReq')}>Add Request</button></li>
            <li className={`menuLiLogout`}><button className="navBtn" onClick={e => props.handleLogout()}>Logout</button></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}