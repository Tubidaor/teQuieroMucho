import React, { Component } from 'react';
import './JournalPage.css';
import JournalMenu from '../../Components/JournalMenu/JournalMenu';
import { JournalEntry, PhotoEntry, AudioEntry, VideoEntry } from '../../Components/JournalMenu/JournalMenuItems';


export default class JournalPage extends Component {
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

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      currentSection: 'home'
    })
  }
  render() {

    let { currentSection } = this.state

    return (
      <section className="journalCon">
        <JournalMenu handleClick={this.handleClick}/>
        
        { currentSection === "journalEntry" && <JournalEntry handleCancel={this.handleCancel}/>}
        { currentSection === "photoEntry" && <PhotoEntry/>}
        { currentSection === "audioEntry" && <AudioEntry/>}
        { currentSection === "videoEntry" && <VideoEntry updateRec={this.handleUpdateRec}/>}
      </section>
    )
  }
}