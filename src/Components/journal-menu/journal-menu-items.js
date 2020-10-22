import React, { Component } from 'react'
import './journal-menu.css'
import { getDate } from '../misc/misc'
import MicRecorder from 'mic-recorder-to-mp3'
import 'react-h5-audio-player/lib/styles.css'
import { registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation
  from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRecordVinyl,
  faSmokingBan, 
  faUpload,
} from '@fortawesome/free-solid-svg-icons'
import { faHandPaper } from '@fortawesome/free-regular-svg-icons'
import AudioPlayer from 'react-h5-audio-player'
import TeQuieroContext from '../../context'


registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
)

export class JournalEntry extends Component {

  static contextType = TeQuieroContext

  componentDidMount() {
    this.context.setError(null)
  }

  render() {
    return (
      <div className="jEntryCon">
        <div className="dateButtonCon">
          <h5 className="jPageH5">Today's Date: <span> {getDate()} </span> </h5>
          <div className="aBtnCon">
          <button
            className="jInputButton"
            onClick={e => this.props.handleCancel(e)}
          >
            <FontAwesomeIcon className="jEntryIcon" icon={faSmokingBan}/>
          </button>
          <button
            form="jForm"
            className="jInputButton"
            onClick={e => this.props.handlePostEntry(e)}
          >
            <FontAwesomeIcon className="jEntryIcon" icon={faUpload}/>
          </button>
        </div>
      </div>
      <form id="jForm">
        <textarea
          type="paragraph"
          id="jInputBox"
          name='jEText'
          className="jInputBox"
          cols="50">
        </textarea>
      </form>    
    </div>
    )
  }
}

export class FileEntry extends Component {

static contextType = TeQuieroContext

  componentDidMount() {
    this.context.setError(null)
  }

  render() {
    return (
      <section className="pEntrySection">
        <div className="dateButtonCon">
          <h5 className="pPageH5">Today's Date: <span>{getDate()}</span></h5>
          <div className="aBtnCon">
            <button
              className="pInputButton"
              onClick={e => this.props.handleCancel(e)}
            >
              <FontAwesomeIcon className="jEntryIcon" icon={faSmokingBan}/>
            </button>
            <button form={"pForm"} className="pInputButton">
              <FontAwesomeIcon className="jEntryIcon" icon={faUpload}/>
            </button>
          </div>
        </div>
        <form
          className="upForm"
          action="/action_page.php"
          id="pForm"
          onSubmit={e => this.props.handleFileEntry(e)}
        >
          <input
            type="file"
            id="pInputBox"
            className="pInputBox"
            name='files'
            multiple
            max="10"
          />
        </form>   
      </section>
    )
  }
}

const Mp3Recorder = new MicRecorder({bitRate: 128})

export class AudioEntry extends Component {

  static contextType = TeQuieroContext

  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false
    }
  }

  async componentDidMount() {
    this.context.setError(null)
    this.stream = await navigator.mediaDevices.getUserMedia({audio: true},
      () => {
        this.setState({ isBlocked: false })
      },
      () => {
        this.setState({ iBlocked: true })
      }
    )
  }

  componentWillUnmount() {
    if(this.stream) {
    this.stream.getTracks().forEach(function(track) {
      track.stop()
      })
    }
  }
    
  start = (e) => {
    e.preventDefault()
    if (!this.stream) {
      this.context.setError("Please enable Microphone.")
      return
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          
          let start = document.getElementById("btnStart")
          let stop = document.getElementById("btnStop")
          start.style.display = "none"
          if (stop.style.display === "") {
            stop.style.display = "block"
            start.style.display = "none"
          } else {
            stop.style.display = "none"
          }
          this.setState({isRecording: true })
        })
        .catch((e) => console.error(e))
    }
  }

  stop = (e) => {
    e.preventDefault()
    let upload = document.getElementById("aUploadBtn")
    let stop = document.getElementById("btnStop")
    if (stop.style.display === "block") {
      stop.style.display = "none"
      upload.style.display = "block"
    } else {
      stop.style.display = "block"
    }

    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false })
      })
      .catch((e) => this.context.setError(e))
  }
  
  render() {
    
    return (
      <section className="audioSection">
        <form  className="dateButtonCon">
        <h5 className="aPageH5">Today's Date: <span>{getDate()}</span></h5>
        <div className="aBtnCon">
          <button 
            className="aButton"
            id="btnStart"
            onClick={this.start}
            disabled={this.state.isRecording}
          >
            <FontAwesomeIcon className="aIcon" icon={faRecordVinyl}/>
          </button>
          <button
            className="btnStop"
            id="btnStop"
            onClick={this.stop}
            disabled={!this.state.isRecording}
          >
            <FontAwesomeIcon  icon={faHandPaper}/>
          </button>
          <button
              id="pInputButton"
              type="reset"
              className="pInputButton"
              onClick={e => this.props.handleCancel(e)}
              >
            <FontAwesomeIcon className="fStopIcon" icon={faSmokingBan}/>
          </button>
          <button
            className="aUploadBtn"
            id="aUploadBtn"
            type="submit"
            onClick={event =>
              this.props.handleAudioEntry(event, this.state.blobURL)}
            >
            <FontAwesomeIcon className="aIcon" icon={faUpload}/>
          </button>
        </div>
      </form>
      { this.state.isRecording === true &&
        <div className="recMessage">
            <p>Recording in progress.</p>
        </div>
      } 
        <AudioPlayer
          className="rhap_container aPlayer"
          src={this.state.blobURL}
          controls
        />
      </section>
    )
  }
}

export class VideoEntry extends Component {

  static contextType = TeQuieroContext
  
  constructor(props) {
    super(props)
    this.state = {
      recording: null,
      blocked: false,
      blobURL: "",
      vidURL: "",
      constraintObj: { 
          audio: false, 
          video: { 
              facingMode: "user", 
              // width: { min: 300, ideal: 1280, max: 1920 },
              // height: { min: 300, ideal: 720, max: 1080 } 
          } 
        } 
    } 
  }

  async componentDidMount() {
    this.context.setError(null)
    this.stream = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: true
      }
    )
    this.mediaRecorder = new MediaRecorder(this.stream)
    this.videoRec = document.getElementById("vidRec")
    
    if("srcObject" in this.videoRec) {
      this.videoRec.srcObject = this.stream
    } else {
      this.videoRec.src = window.URL.createObjectURL(this.stream)
    }
    this.videoRec.play()
    this.chunks = []
    this.mediaRecorder.ondataavailable = e => {
      if(e.data && e.data.size > 0) {
        this.chunks.push(e.data)
      }
    }
  }

  componentDidUpdate() {
    this.videoPlay = document.getElementById("vidPlay")
  }

  startRec = (e) => {
    e.preventDefault()
    let start = document.getElementById("btnStart")
    let stop = document.getElementById("btnStop")
    if(!this.stream) {
      this.context.setError("Please enable Microphone and Camera.")
      return
    }
    start.style.display = "none"
    if (stop.style.display === "") {
      stop.style.display = "block"
      start.style.display = "none"
    } else {
      stop.style.display = "none"
    }
    this.mediaRecorder.start()
    this.setState({recording: true})
  }

  componentWillUnmount() {
    if(this.stream) {
    this.stream.getTracks().forEach(function(track) {
      track.stop()
      })
    }
  }

  stopRec = (e) => {
    e.preventDefault()
    let upload = document.getElementById("aUploadBtn")
    let stop = document.getElementById("btnStop")
    let vidRec = document.getElementById("vidRec")

    if (stop.style.display === "block") {
      stop.style.display = "none"
      upload.style.display = "block"
      vidRec.style.display = "none"
    }
    
    this.mediaRecorder.stop()
    this.stream.getTracks().forEach(function(track) {
      track.stop()
    })
    this.setState({recording: false})
    this.mediaRecorder.onstop = (ev)=> {
      let blob = new Blob(this.chunks, { type : 'video/mp4' })
      this.chunks = []
      let videoURL = window.URL.createObjectURL(blob)
      this.videoPlay.src = videoURL
      this.setState({
        vidURL: videoURL
      })
    }
  }

  render() {
    let { recording } = this.state

    return (
      <section className="vSection">
        <form className="dateButtonCon">
          <h5 className="aPageH5">Today's Date: <span>{getDate()}</span> </h5>
          <div className="aBtnCon">
            <button  className="aButton" id="btnStart" onClick={this.startRec}>
              <FontAwesomeIcon icon={faRecordVinyl}/>
            </button>
            <button className="btnStop" id="btnStop" onClick={this.stopRec}>
              <FontAwesomeIcon className="fStopIcon" icon={faHandPaper}/>
            </button>
            <button
              id="pInputButton"
              type="reset"
              className="pInputButton"
              onClick={e => this.props.handleCancel(e)}
            >
              <FontAwesomeIcon icon={faSmokingBan}/>
            </button>
            <button
              className="aUploadBtn"
              type="submit"
              id="aUploadBtn"
              onClick={event =>
                this.props.handleVideoEntry(event, this.state.vidURL)
              }
            >
              <FontAwesomeIcon icon={faUpload}/>
            </button>
          </div>
        </form>
        { 
          recording === true &&
          <div className="recMessage">
            <p>Recording in progress.</p>
          </div>
        } 
        <video
          id="vidRec"
          className="vCon"
        />
        {
          recording === false &&
          <video
            id="vidPlay"
            className="vPlay"
            controls
          >
          </video>
        }
      </section>
    )
  }
}