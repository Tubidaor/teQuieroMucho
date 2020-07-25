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
  
  setStateToHome = () => {
    this.setState({
      currentSection: 'home'
    })
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
    this.setStateToHome()
  }
  handlePostEntry = (e) => {
    e.preventDefault()

    const { jEText } = document.getElementById('jForm')
    const newTextEntry = {
      text: jEText.value
    }
    JournalServices.postJournalEntry(newTextEntry)
    this.setStateToHome()
  }

  handleAudioEntry = (e) => {
    e.preventDefault()
    const { files } = document.getElementById('pForm')
    console.log( files.files[0])
    const formData = new FormData();
    for(let i = 0; i < files.files.length; i++) {
      formData.append('files', files.files[i])
    }

    console.log(formData)
    JournalServices.postFileEntry(formData)
      .then(res => console.log(res))

    this.setStateToHome()

  }

  
  render() {

    let { currentSection } = this.state

    return (
      <section className="journalCon">
        <JournalMenu handleClick={this.handleClick}/>
        
        { currentSection === "journalEntry" && <JournalEntry handlePostEntry={this.handlePostEntry} handleCancel={this.handleCancel}/>}
        { currentSection === "fileEntry" && <FileEntry handleAudioEntry={this.handleAudioEntry} handleCancel={this.handleCancel}/>}
        { currentSection === "audioEntry" && <AudioEntry handleCancel={this.handleCancel}/>}
        { currentSection === "videoEntry" && <VideoEntry handleCancel={this.handleCancel} updateRec={this.handleUpdateRec}/>}
      </section>
    )
  }
}