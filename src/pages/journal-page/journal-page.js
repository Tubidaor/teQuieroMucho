import React, { Component } from 'react'
import './journal-page.css'
import JournalMenu from '../../components/journal-menu/journal-menu'
import { JournalServices } from '../../services/api-services'
import {
  JournalEntry,
  FileEntry,
  AudioEntry,
  VideoEntry
} from '../../components/journal-menu/journal-menu-items'
import Error from '../../components/error/error'
import TeQuieroContext from '../../context'

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
      recording: !true
    })
  }

  handleCancel = (e) => {
    e.preventDefault()
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
    const formData = new FormData()
    for(let i = 0; i < files.files.length; i++) {
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
    const formData = new FormData()
    formData.append('files', blob)
    JournalServices.postFileEntry(formData)
      .then(data => this.context.setError(data))
    this.handleClick("home")
  }

  handleVideoEntry = async (e, blobURL) => {
    e.preventDefault()
    const blob = await fetch(blobURL).then(res =>
      res.blob()
      )
      .then(blobFile => {return new Blob([blobFile], {type: "video/mp4"})})
    const formData = new FormData()
    formData.append('files', blob)
    JournalServices.postFileEntry(formData)
      .then(data => this.context.setError(data))
    this.handleClick("home")
  }

  render() {
    let { currentSection } = this.state

    return (
      <section className="journalSection">
        <JournalMenu handleClick={this.handleClick}/>
        { this.context.error && <Error/> }
        {
          currentSection === "journalEntry" &&
          <JournalEntry
            handlePostEntry={this.handlePostEntry}
            handleCancel={this.handleCancel}
          />
        }
        { 
          currentSection === "fileEntry" &&
          <FileEntry 
            handleFileEntry={this.handleFileEntry}
            handleCancel={this.handleCancel}
          />
        }
        { 
          currentSection === "audioEntry" &&
          <AudioEntry
            handleAudioEntry={this.handleAudioEntry}
            handleCancel={this.handleCancel}
          />
        }
        { currentSection === "videoEntry" && 
          <VideoEntry
            handleVideoEntry={this.handleVideoEntry}
            handleCancel={this.handleCancel}
            updateRec={this.handleUpdateRec}
          />
        }
      </section>
    )
  }
}