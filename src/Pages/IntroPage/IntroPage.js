import  React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './IntroPage.css'
import config from '../../config'

export default class IntroPage extends Component {
  defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }

  handleLoginPath = () => {
    const { history } = this.props
    history.push('/login')
  }
  
  handleRegPath = () => {
    const { history } = this.props
    history.push('/register')
  }
  render() {

    return (
      <div className="introPageContainer">
        <div className="introPageTop">
        <h2 className="introH1">Te Quiero Mucho</h2>
        <img className="introImg" alt="logo for app" src={`${config.API_ENDPOINT}/uploads/static/treeOfLife2.png`}/>
        <p className="introP">Relationships need cultivating: we're here to help.</p>
        </div>
        <div className="introButtonContainer">
          <button onClick={this.handleLoginPath}>
              Login
          </button>
          <button onClick={this.handleRegPath}>
              Register
          </button>
        </div>
      </div>
    )
  }
}