import React, { Component } from 'react';
import './JournalPage.css';
import JournalMenu from '../../Components/JournalMenu/JournalMenu';
import { JournalEntry, PhotoEntry, AudioEntry } from '../../Components/JournalMenu/JournalMenuItems';


export default class JournalPage extends Component {
  state = {
    currentSection: "home"
  }
  handleClick = (currentSection) => {
    this.setState({
      currentSection
    })
  }
  render() {

    let { currentSection } = this.state

    return (
      <div className="journalCon">
        <JournalMenu handleClick={this.handleClick}/>
        
        { currentSection === "journalEntry" && <JournalEntry/>}
        { currentSection === "photoEntry" && <PhotoEntry/>}
        { currentSection === "audioEntry" && <AudioEntry/>}
      </div>
    )
  }
}