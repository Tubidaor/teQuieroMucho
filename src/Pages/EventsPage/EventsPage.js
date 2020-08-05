import React, { Component } from 'react';
import  { JournalServices } from '../../Services/APIServices';
// import AudioFeed from './AudioFeed';
import ImagesFeed from '../../Components/EventsFeed/ImagesFeed';
import JournalFeed from '../../Components/EventsFeed/JournalFeed';
import config from '../../config'
import EventsMenu from '../../Components/EventsFeed/EventsMenu';
import './EventsPage.css';


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
    const  { audio, images, journals } = this.state
    const staticURL = config.API_ENDPOINT
    // const displayAudioFeed = audio.map(entry => <AudioFeed key={entry.id} blob={entry.file_path}/>)
    const displayImageFeed = images.map(image => <ImagesFeed key={image.id} imageURL={staticURL+"/"+ image.file_path}/>)
    const displayJournalFeed = journals.map(journal => <JournalFeed key={journal.id} date={journal.date_created} journal={journal.text}/>)
    return (
      <section className="eFeedSec">
        <EventsMenu handleClick={this.handleClick} />
        {/* {displayAudioFeed} */}
        <ul>
          {this.state.section === 'Images' && displayImageFeed}
        </ul>
        <ul>
          {this.state.section === 'Journal' && displayJournalFeed}
        </ul>
        {/* <img src={`http://localhost:8000/api/uploads\\73b8bb71-c339-4029-bc70-6204928aa77b\\8a541e44-3483-4715-b9a9-f0726a3616fe-cat.jfif`} /> */}
      </section>
    )
  }
}