import React, { Component } from 'react'
import RelMenu from '../../components/relationship-menu/rel-menu'
import Questions from '../../components/questions/questions'
import {
  Analytics,
  Alerts,
  AddIssue
} from '../../components/relationship-menu/rel-menu-items'
import './relationship-page.css'
import Error from '../../components/error/error'
import TeQuieroContext from '../../context'

export default class RelationshipPage extends Component {

  static contextType = TeQuieroContext
  
  state = {
    currentSection: "home",
    recording: true
  }

  handleClick = (currentSection) => {
    this.setState({
      currentSection
    })
  }

  handleUpdateRec = () => {
    this.setState({
      recording: !true
    })
  }

  handlePushToHome = () => {
    this.setState({
      currentSection: "home"
    })
  }
  
  render() {
    let { currentSection } = this.state

    return (
      <section className="relationshipSection">
        {this.context.error && <Error/>}
        <RelMenu handleClick={this.handleClick}/>
        { 
          currentSection === "questions" && 
          <Questions
            handlePushURL={this.handlePushToHome}
            qType="Relationship"
          />
        }
        { 
          currentSection === "analytics" && 
          <Analytics />
        }
        { 
          currentSection === "alerts" && 
          <Alerts />
        }
        { 
          currentSection === "issues" && 
          <AddIssue submitNewQuestion={this.submitNewQuestion} />
        }
      </section>
    )
  }
}