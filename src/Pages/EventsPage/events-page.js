import React, { Component } from 'react'
import  { JournalServices } from '../../Services/APIServices'
import AudioFeed from '../../Components/EventsFeed/audio-feed'
import ImagesFeed from '../../Components/EventsFeed/images-feed'
import JournalFeed from '../../Components/EventsFeed/journal-feed'
import EventsMenu from '../../Components/EventsFeed/events-menu'
import './events-page.css'
import VideoFeed from '../../Components/EventsFeed/videos-feed'

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
        })
      })
    JournalServices.getVideoData()
      .then(videos => {
        this.setState({
          videos
        })
      })
    JournalServices.getImagesData()
      .then(images => {
        this.setState({
          images
        })
      })
    JournalServices.getJournalData()
      .then(journals => {
        this.setState({
          journals
        })
      })
      .catch(e => this.setState({journals: []}))
  }

  handleClick = (section) => {
    this.setState({
      section
    })
  } 

  render() {

    const  { audio, images, journals, videos } = this.state

    return (
      <section className="eFeedSec">
        <EventsMenu handleClick={this.handleClick} />
          {this.state.section === 'Images' && <ImagesFeed images={images}/>}
          {
            this.state.section === 'Journal' &&
            <JournalFeed journals={journals}/>
          }
          {this.state.section === 'Audio' && <AudioFeed audio={audio}/>}
          {this.state.section === 'Video' && <VideoFeed videos={videos}/>}
      </section>
    )
  }
}