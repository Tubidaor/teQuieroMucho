import React, { Component } from 'react';
import RelMenu from '../../Components/RelationshipMenu/RelMenu';
import Questions from '../../Components/Questions/Questions';
import { Analytics, Alerts, AddIssue } from '../../Components/RelationshipMenu/RelMenuItems';

export default class RelationshipPage extends Component {
  state = {
    currentSection: "home",
    recording: true,
  }
  handleClick = (currentSection) => {
    this.setState({
      currentSection
    })
  }
  handleUpdateRec = () => {
    this.setState({
      recording: !true,
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
          <AddIssue />
        }
      </section>
    )
  }
}