import React, { Component } from 'react';
import './JournalMenu.css';
import { getDate } from '../Misc/Misc';
import MicRecorder from 'mic-recorder-to-mp3';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


export function JournalEntry() {

  return(
    <section className="jEntrySection">
      <div className="dateButtonCon">
        <h5 className="jPageH5">Today's Date: {getDate()}</h5>
        <button className="jInputButton">cancel</button>
        <button form={"jForm"} className="jInputButton">done</button>
      </div>
      <form id="jForm">
        <input type="text" id="jInputBox" className="jInputBox"></input>
      </form>    
        
    </section>
  )
}

export function PhotoEntry() {

  return (
    <section className="pEntrySection">
      <div className="dateButtonCon">
      <h5 className="pPageH5">Today's Date: {getDate()}</h5>
        <button className="pInputButton">cancel</button>
        <button form={"pForm"} className="pInputButton">done</button>
      </div>
      <form action="/action_page.php" id="pForm">
        <input type="file" id="pInputBox" className="pInputBox" multiple></input>
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

  componentDidMount() {
    
    navigator.mediaDevices.getUserMedia({audio: true},
    () => {
      this.setState({ isBlocked: false })
    },
    () => {
      this.setState({ iBlocked: true })
    }
    )
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
      <section>
        <button onClick={this.start} disabled={this.state.isRecording}>
          Record
        </button>
        <button onClick={this.stop} disabled={!this.state.isRecording}>
          Stop
        </button>
        {/* <audio controls="controls" src={this.state.blobURL} type="audio/mpeg"/> */}
        <AudioPlayer src={this.state.blobURL}/>
      </section>
    )
  }
}