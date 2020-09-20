import  React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './IntroPage.css'
import config from '../../config'

export default class IntroPage extends Component {
  render() {

    return (
      <div className="introPageContainer">
        <h1 className="introH1">Te Quiero Mucho</h1>
        <img className="introImg" alt="logo for app" src={`${config.API_ENDPOINT}/uploads/static/treeOfLife2.png`}/>
        <p className="introP">We would like to think that all you need is love. However, a relationship can only grow if two people are committed to each other and the relationship.</p>
        <div className="introButtonContainer">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="register">
            <button>Register</button>
          </Link>
        </div>
        <div className="introLighting"></div>
      </div>
    )
  }
}