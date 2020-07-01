import React, { Component } from 'react';
import './JournalMenu.css';
import { getDate } from '../Misc/Misc';
import MicRecorder from 'mic-recorder-to-mp3';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { JournalServices } from '../../Services/APIServices'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'

registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  )




export function JournalEntry(props) {
  function handlePostEntry(e) {
    e.preventDefault()

    const text = document.getElementById('jInputBox').value
    JournalServices.postJournalEntry(text)
  }
  return(
    <section className="jEntrySection">
      <div className="dateButtonCon">
        <h5 className="jPageH5">Today's Date: {getDate()}</h5>
        <button className="jInputButton" onClick={e => props.handleCancel(e)}>Cancel</button>
        <button form="jForm" className="jInputButton" onClick={e => handlePostEntry(e)}>Submit</button>
      </div>
      <form id="jForm">
        <textarea type="paragraph" id="jInputBox" className="jInputBox" cols="50"></textarea>
      </form>    
        
    </section>
  )
}

export function FileEntry(props) {

  // const inputElement = document.querySelector('input[type=file]');
  // FilePond.create(inputElement)
  

  return (
    <section className="pEntrySection">
      <div className="dateButtonCon">
      <h5 className="pPageH5">Today's Date: {getDate()}</h5>
        <button className="pInputButton" onClick={e => props.handleCancel(e)}>Cancel</button>
        <button form={"pForm"} className="pInputButton">Submit</button>
      </div>
      <form action="/action_page.php" id="pForm">
        <input
          type="file"
          id="pInputBox"
          className="pInputBox"
          multiple
        />
      </form>   
    </section>
  )
}

const Mp3Recorder = new MicRecorder({bitRate: 128});

export class AudioEntry extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    }
  }

  async componentDidMount() {
    
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
    this.stream.getTracks().forEach(function(track) {
      track.stop()
      })
  }
    
  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied")
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({isRecording: true })
        }).catch((e) => console.error(e));
    }
  }

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };
  

  render() {

    


    return (
      <section className="audioSection">
        <div className="aDateButtonCon">
          <h5 className="pPageH5">Today's Date: {getDate()}</h5>
          <button  className="aButton" onClick={this.start} disabled={this.state.isRecording}>
            Record
          </button>
          <button className="aButton" onClick={this.stop} disabled={!this.state.isRecording}>
            Stop
          </button>
          <button className="aButton">
            Save
          </button>
        </div>
        {/* <audio controls="controls" src={this.state.blobURL} type="audio/mpeg"/> */}
        <AudioPlayer className="rhap_container aPlayer" src={this.state.blobURL}/>
      </section>
    )
  }
}



export class VideoEntry extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      recording: true,
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
    this.stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true})
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
        this.chunks.push(e.data);
      }
    }
  }

  componentDidUpdate() {
    this.videoPlay = document.getElementById("vidPlay")
    
  }

  startRec = () => {
    this.mediaRecorder
      .start()
      
      this.setState({recording: true})
  
  
    console.log(this.mediaRecorder.state)
  }

  componentWillUnmount() {
    this.stream.getTracks().forEach(function(track) {
      track.stop()
      })
  }
    
  

  stopRec = () => {
    this.mediaRecorder
      .stop()
    this.stream.getTracks().forEach(function(track) {
      track.stop()
    });
    this.setState({recording: false})
    this.mediaRecorder.onstop = (ev)=> {
      let blob = new Blob(this.chunks, { 'type' : 'video/mp4;' });
      this.chunks = [];
      let videoURL = window.URL.createObjectURL(blob);
      this.videoPlay.src = videoURL
    }
  }

  play = () => {
    this.videoPlay.play()
  }
  stop = () => {
    this.videoPlay.pause()
    this.videoPlay.currentTime = 0
  }

  updateTime = () => {
      let time = this.videoPlay.currentTime.toFixed(0)
      document.getElementById("demo").innerHTML = time
  }
  

  render() {


    const recordMenu = (
      <div className="recordMenu">
        <button id="btnStartRec" onClick={this.startRec}>START RECORDING</button>
        <button id="btnStopRec" onClick={this.stopRec}>STOP RECORDING</button>
        <video id="vidRec" className="vCon"></video>
      </div>
    )
    
    const playMenu = (
      <div className="recordMenu">
      <button id="btnPlay" onClick={this.play}>Play</button>
      <button id="btnStopVid" onClick={this.stop}>Stop</button>
      <span id="demo"></span>
        <video id="vidPlay" className="vPlay" onTimeUpdate={this.updateTime}></video>
      </div>
    )
    
    let { recording } = this.state

    return (
      <section className="vSection">
        {recording === true && recordMenu}
        {recording === false && playMenu}
      </section>
    )
  }
}