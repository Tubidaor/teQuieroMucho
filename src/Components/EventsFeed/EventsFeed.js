import React, { Component } from 'react';
import  { JournalServices } from '../../Services/APIServices';


export default class EventsFeed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      journals: '',
      audio: '',
      videos: '',
      images: ''
    }
  }

  componentDidMount() {
    JournalServices.getAudioData()
      .then(audio => {
        this.setState({
          audio
        }, console.log('audio', this.state.audio))
      })
    JournalServices.getVideoData()
      .then(videos => {
        this.setState({
          videos
        }, console.log('video', this.state.videos))
      })
    JournalServices.getImagesData()
      .then(images => {
        this.setState({
          images
        }, console.log('images', this.state.images))
      })
    JournalServices.getJournalData()
      .then(journals => {
        this.setState({
          journals
        }, console.log('journals', this.state.journals))
      })
    
  }



  render() {
    console.log(this.state.audio)
    console.log(this.state.videos)
    console.log(this.state.journals)
    console.log(this.state.images)
    return (
      <section className="eFeedSec">

      </section>
    )
  }
}