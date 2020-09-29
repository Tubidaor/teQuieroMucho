import React, { Component } from 'react';
import './JournalPage.css';
import JournalMenu from '../../Components/JournalMenu/JournalMenu';
import { JournalServices } from '../../Services/APIServices';
import { JournalEntry, FileEntry, AudioEntry, VideoEntry } from '../../Components/JournalMenu/JournalMenuItems';
import { text } from '@fortawesome/fontawesome-svg-core';
import Error from '../../Components/Error/Error';
import TeQuieroContext from '../../Context'

export default class JournalPage extends Component {

  static contextType = TeQuieroContext

  state = {
    currentSection: "journalEntry",
    recording: false,
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
    this.handleClick('home')
  }
  handlePostEntry = (e) => {
    e.preventDefault()

    const { jEText } = document.getElementById('jForm')
    const newTextEntry = {
      text: jEText.value
    }
    JournalServices.postJournalEntry(newTextEntry)
      .then(this.handleClick("home"))
      .catch(e => this.context.setError(e.error))
  }

  handleFileEntry = (e) => {
    e.preventDefault()
    const { files } = document.getElementById('pForm')
    
    const formData = new FormData();
    for(let i = 0; i < files.files.length; i++) {
      console.log(files.files[i])
      if(files.files[i].type.includes('video')) {
        const blob = new Blob([files.files[i]], { type: 'video/mp4'})
        formData.append('files', blob) 
      }
      if(files.files[i].type.includes('audio')) {
        const blob = new Blob([files.files[i]], { type: 'audio/mp3'})
        formData.append('files', blob)
      }
      
      formData.append('files', files.files[i])
    }

    JournalServices.postFileEntry(formData)
      .then(this.handleClick("home"))
      .catch(e => this.context.setError(e.error))

  }

  handleAudioEntry = async (e, blobURL) => {
    e.preventDefault()
    const blob = await fetch(blobURL).then(res =>
      res.blob()
      )
      .then(blobFile => {return new Blob([blobFile], {type: "audio/mp3"})})
    const formData = new FormData();
    formData.append('files', blob)

    console.log(formData)
    JournalServices.postFileEntry(formData)
      .then(data => console.log(data))

    this.handleClick("home")

  }

  handleVideoEntry = async (e, blobURL) => {
    e.preventDefault()
    const blob = await fetch(blobURL).then(res =>
      res.blob()
      )
      .then(blobFile => {return new Blob([blobFile], {type: "video/mp4"})})
    
    const formData = new FormData();
    formData.append('files', blob)

    console.log(blob,)
    JournalServices.postFileEntry(formData)
      .then(data => console.log(data))

    this.handleClick("home")

  }

  
  
  render() {

    let { currentSection } = this.state

    return (
      <section className="journalSection">
        <JournalMenu handleClick={this.handleClick}/>
        { this.context.error && <Error/> }
        { currentSection === "journalEntry" && <JournalEntry handlePostEntry={this.handlePostEntry} handleCancel={this.handleCancel}/>}
        { currentSection === "fileEntry" && <FileEntry handleFileEntry={this.handleFileEntry} handleCancel={this.handleCancel}/>}
        { currentSection === "audioEntry" && <AudioEntry handleAudioEntry={this.handleAudioEntry} handleCancel={this.handleCancel}/>}
        { currentSection === "videoEntry" && <VideoEntry handleVideoEntry={this.handleVideoEntry} handleCancel={this.handleCancel} updateRec={this.handleUpdateRec}/>}
      </section>
    )
  }
}