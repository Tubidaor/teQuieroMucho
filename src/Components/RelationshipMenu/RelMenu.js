import React from 'react';
import './RelMenu.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faExclamationTriangle, faChartPie } from '@fortawesome/free-solid-svg-icons'


export default function RelMenu(props) {

  return(
    <div className="relMenuCon">
      <Link className="relMenuItem" onClick={e => props.handleClick("questions")}>
        <span>
          <FontAwesomeIcon icon={faQuestionCircle}/>
        </span>
        <span>
          Questions
        </span>
      </Link>
      <Link className="relMenuItem" onClick={e => props.handleClick("analytics")}>
        <span>
          <FontAwesomeIcon icon={faChartPie}/>
        </span>
        <span>
          Analytics
        </span>
      </Link>
      <Link className="relMenuItem" onClick={e => props.handleClick("alerts")}>
        <span>
          <FontAwesomeIcon icon={faExclamationTriangle}/>
        </span>
        <span>
          Alerts
        </span>
      </Link>
      <Link className="relMenuItem" onClick={e => props.handleClick("issues")}>
        <span>
          <FontAwesomeIcon icon={faQuestionCircle}/>
        </span>
        <span>
          Add Question
        </span>
      </Link>
    </div>
  )
}