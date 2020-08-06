import React, { Component } from 'react';
import  { JournalServices } from '../../Services/APIServices';
import AudioFeed from '../../Components/EventsFeed/AudioFeed';
import ImagesFeed from '../../Components/EventsFeed/ImagesFeed';
import JournalFeed from '../../Components/EventsFeed/JournalFeed';
import config from '../../config'
import EventsMenu from '../../Components/EventsFeed/EventsMenu';
import './EventsPage.css';
import VideoFeed from '../../Components/EventsFeed/VideosFeed';


export default class EventsPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      journals: [],
      audio: [],
      videos: [],
      images: [],
      section: 'Journal'
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

  handleClick = (section) => {
    this.setState({
      section
    })
  } 

  render() {
    console.log(this.state.audio)
    console.log(this.state.videos)
    console.log(this.state.journals)
    console.log(this.state.images)
    const  { audio, images, journals, videos } = this.state
    const staticURL = config.API_ENDPOINT
    const displayAudioFeed = audio.map(entry => <AudioFeed key={entry.id} audioId={entry.entry_id}/>)
    const displayImageFeed = images.map(image => <ImagesFeed key={image.id} imageURL={staticURL+"/"+ image.file_path}/>)
    const displayJournalFeed = journals.map(journal => <JournalFeed key={journal.id} date={journal.date_created} journal={journal.text}/>)
    const displayVideosFeed = videos.map(video => <VideoFeed key={video.id} videoId={video.entry_id}/>)
    return (
      <section className="eFeedSec">
        <EventsMenu handleClick={this.handleClick} />
        <ul>
          {this.state.section === 'Images' && displayImageFeed}
          {this.state.section === 'Journal' && displayJournalFeed}
          {this.state.section === 'Audio' && displayAudioFeed}
          {this.state.section === 'Video' && displayVideosFeed}
        </ul>
      </section>
    )
  }
}