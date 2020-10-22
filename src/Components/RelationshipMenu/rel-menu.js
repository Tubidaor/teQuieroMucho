import React from 'react'
import './rel-menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuestionCircle,
  faExclamationTriangle,
  faChartPie
} from '@fortawesome/free-solid-svg-icons'


export default function RelMenu(props) {

  return(
    <ul className="relMenuCon">
      <li className="relMenuItem" onClick={e => props.handleClick("questions")}>
        <span>
          <FontAwesomeIcon icon={faQuestionCircle}/>
        </span>
        <span>
          Questions
        </span>
      </li>
      <li className="relMenuItem" onClick={e => props.handleClick("analytics")}>
        <span>
          <FontAwesomeIcon icon={faChartPie}/>
        </span>
        <span>
          Analytics
        </span>
      </li>
      <li className="relMenuItem" onClick={e => props.handleClick("alerts")}>
        <span>
          <FontAwesomeIcon icon={faExclamationTriangle}/>
        </span>
        <span>
          Alerts
        </span>
      </li>
      <li className="relMenuItem" onClick={e => props.handleClick("issues")}>
        <span>
          <FontAwesomeIcon icon={faQuestionCircle}/>
        </span>
        <span>
          Add Q's
        </span>
      </li>
    </ul>
  )
}