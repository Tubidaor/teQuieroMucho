import React, { Component } from 'react'
import RelMenu from '../../Components/RelationshipMenu/rel-menu'
import Questions from '../../Components/Questions/questions'
import {
  Analytics,
  Alerts,
  AddIssue
} from '../../Components/RelationshipMenu/rel-menu-items'
import './relationship-page.css'
import Error from '../../Components/Error/error'
import TeQuieroContext from '../../Context'

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