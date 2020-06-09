import  React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './IntroPage.css'

export default class IntroPage extends Component {
  render() {

    return (
      <div className="introPageContainer">
        <h1 className="introH1">Te Quiero Mucho</h1>
        <img className="introImg" src="https://i.ibb.co/4tJQSVw/two-trees-love-looks-like-600w-426826279.jpg"/>
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