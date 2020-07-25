import React, { Component } from 'react';
import './JournalMenu.css';
import { getDate } from '../Misc/Misc';
import MicRecorder from 'mic-recorder-to-mp3';
// import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { JournalServices } from '../../Services/APIServices'
import { registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// import 'tui-image-editor/dist/tui-image-editor.css';
// import ImageEditor from '@toast-ui/react-image-editor';
// import AuthServices from '../../Services/APIServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFastForward,
  faFastBackward,
  faRecordVinyl,
  faSmokingBan, 
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faHandPaper } from '@fortawesome/free-regular-svg-icons';

registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  )




export function JournalEntry(props) {

 

  return(
    <section className="jEntrySection">
      <div className="dateButtonCon">
        <h5 className="jPageH5">Today's Date: {getDate()}</h5>
        <button className="jInputButton" onClick={e => props.handleCancel(e)}>
          <FontAwesomeIcon className="jEntryIcon" icon={faSmokingBan}/>
        </button>
        <button form="jForm" className="jInputButton" onClick={e => props.handlePostEntry(e)}>
          <FontAwesomeIcon className="jEntryIcon" icon={faUpload}/>
        </button>
      </div>
      <form id="jForm">
        <textarea type="paragraph" id="jInputBox" name='jEText' className="jInputBox" cols="50"></textarea>
      </form>    
        
    </section>
  )
}

export function FileEntry(props) {

  // const inputElement = document.querySelector('input[type=file]');
  // FilePond.create(inputElement)
  function handleFileSubmit(e) {
    e.preventDefault();
    //need to get files, and submit to server through fetch 'post'
  JournalServices.postFileEntry() 
  }

  return (
    <section className="pEntrySection">
      <div className="dateButtonCon">
      <h5 className="pPageH5">Today's Date: {getDate()}</h5>
        <button className="pInputButton" onClick={e => props.handleCancel(e)}>
          <FontAwesomeIcon className="jEntryIcon" icon={faSmokingBan}/>
        </button>
        <button form={"pForm"} className="pInputButton">
          <FontAwesomeIcon className="jEntryIcon" icon={faUpload}/>
        </button>
      </div>
      <form action="/action_page.php" id="pForm" onSubmit={e => handleFileSubmit(e)}>
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
      menu: "rec",
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
    this.setState({
      menu: "play"
    })
  };
  
  handleAudioSubmit = (e) => {
    e.preventDefault()
    // post audiot entry 
    JournalServices.postAudioEntry()
  }
  render() {

    const recMenu = (
      <form onSubmit={e => this.handleAudioSubmit(e)} className="aDateButtonCon">
        <h5 className="aPageH5">Today's Date: {getDate()}</h5>
        <div className="aBtnCon">
          <button  className="aButton" onClick={this.start} disabled={this.state.isRecording}>
            <FontAwesomeIcon className="aIcon"icon={faRecordVinyl}/>
          </button>
          <button className="btnStop" onClick={this.stop} disabled={!this.state.isRecording}>
            <FontAwesomeIcon  icon={faHandPaper}/>
          </button>
        </div>
        <div className="aBtnCon">
          <button
              id="vCancelBtn"
              type="reset"
              className="vCancelBtn"
              onClick={e => this.props.handleCancel(e)}
              >
            <FontAwesomeIcon className="fStopIcon" icon={faSmokingBan}/>
          </button>
          <button className="aButton">
            <FontAwesomeIcon className="aIcon" icon={faUpload}/>
          </button>
        </div>
      </form>
    )

    const playMenu = (
      <form onSubmit={e => this.handleAudioSubmit(e)} className="aDateButtonCon">

        <div className="playMenu">
          <div className="vMenuCon">
            <button className="btnRwn" >
              <FontAwesomeIcon icon={faFastBackward}/>
            </button>
            <button className="btnPlay" onClick={this.play}>
              <FontAwesomeIcon icon={faGooglePlay}/>
              <span id="demo"></span>
            </button>
            <button className="btnFwd">
              <FontAwesomeIcon icon={faFastForward}/>
            </button> 
            <button className="btnStop" onClick={this.stop}>
              <FontAwesomeIcon icon={faHandPaper}/>
            </button>
          </div>
          <div className="cancelUploadCon">
            <button className="vCancelBtn" type="reset"
              onClick={e => this.props.handleCancel(e)}
            >
              <FontAwesomeIcon icon={faSmokingBan}/>
            </button>
            <button className="btnUpload" type="submit">
              <FontAwesomeIcon icon={faUpload}/>
            </button>
          </div>
        </div>
      </form>
    )

    return (
      <section className="audioSection">
        {this.state.menu === "rec" && recMenu}
        {this.state.menu === "play" && playMenu }
        {/* <audio controls="controls" src={this.state.blobURL} type="audio/mpeg"/> */}
        <audio className="rhap_container aPlayer" src={this.state.blobURL} controls/>
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
  

  handleVideoSubmit = (e) => {
    e.preventDefault();
  } 
  render() {

    //MAKE RECORD CHANGE COLOR WHILE RECORDING
    const recordMenu = (
      <>
        <div className="recordMenu">
          <h5 className="vPageH5">Today's Date: {getDate()}</h5>
          <div className="recStopCon">
            <button className="btnStartRec" onClick={this.startRec}>
              <FontAwesomeIcon icon={faRecordVinyl}/>
            </button>
            <button className="btnStop" onClick={this.stopRec}>
              <FontAwesomeIcon className="fStopIcon" icon={faHandPaper}/>
            </button>
          </div>
          <div className="cancelCon">
            <button
              id="vCancelBtn"
              type="reset"
              className="vCancelBtn"
              onClick={e => this.props.handleCancel(e)}
              >
              <FontAwesomeIcon icon={faSmokingBan}/>
            </button>
          </div>
        </div>
        <video id="vidRec" className="vCon"></video>
      </>
    )
    
    //make handstop multiple colors of raibow as to not have it be hands
    const playMenu = (
      <>
        <div className="playMenu">
          <div className="vMenuCon">
            <button className="btnRwn" >
              <FontAwesomeIcon icon={faFastBackward}/>
            </button>
            <button className="btnPlay" onClick={this.play}>
              <FontAwesomeIcon icon={faGooglePlay}/>
              <span id="demo"></span>
            </button>
            <button className="btnFwd">
              <FontAwesomeIcon icon={faFastForward}/>
            </button> 
            <button className="btnStop" onClick={this.stop}>
              <FontAwesomeIcon icon={faHandPaper}/>
            </button>
          </div>
          <div className="cancelUploadCon">
            <button className="vCancelBtn" type="reset"
              onClick={e => this.props.handleCancel(e)}
            >
              <FontAwesomeIcon icon={faSmokingBan}/>
            </button>
            <button className="btnUpload" type="submit">
              <FontAwesomeIcon icon={faUpload}/>
            </button>
          </div>
        </div>
        <video id="vidPlay" className="vPlay" onTimeUpdate={this.updateTime}></video>
      </>
    )
    
    let { recording } = this.state

    return (
      <section className="vSection">
        <form onSubmit={this.handleVideoSubmit}className="vForm" id="vForm">
          {recording === true && recordMenu}
          {recording === false && playMenu}
        </form>
      </section>
    )
  }
}