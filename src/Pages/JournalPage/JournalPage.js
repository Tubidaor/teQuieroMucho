import React, { Component } from 'react';
import './JournalPage.css';
import JournalMenu from '../../Components/JournalMenu/JournalMenu';
import { JournalServices } from '../../Services/APIServices';
import { JournalEntry, FileEntry, AudioEntry, VideoEntry } from '../../Components/JournalMenu/JournalMenuItems';
import { text } from '@fortawesome/fontawesome-svg-core';


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
  handlePostEntry = (e) => {
    e.preventDefault()

    const { jEText } = document.getElementById('jForm')
    const newTextEntry = {
      text: jEText.value
    }
    JournalServices.postJournalEntry(newTextEntry)
    this.setState({
      currentSection: 'home'
    })
  }

  
  render() {

    let { currentSection } = this.state

    return (
      <section className="journalCon">
        <JournalMenu handleClick={this.handleClick}/>
        
        { currentSection === "journalEntry" && <JournalEntry handlePostEntry={this.handlePostEntry} handleCancel={this.handleCancel}/>}
        { currentSection === "fileEntry" && <FileEntry handleCancel={this.handleCancel}/>}
        { currentSection === "audioEntry" && <AudioEntry handleCancel={this.handleCancel}/>}
        { currentSection === "videoEntry" && <VideoEntry handleCancel={this.handleCancel} updateRec={this.handleUpdateRec}/>}
      </section>
    )
  }
}