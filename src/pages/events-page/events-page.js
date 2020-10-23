import React, { Component } from 'react'
import  { JournalServices } from '../../services/api-services'
import AudioFeed from '../../components/events-feed/audio-feed'
import ImagesFeed from '../../components/events-feed/images-feed'
import JournalFeed from '../../components/events-feed/journal-feed'
import EventsMenu from '../../components/events-feed/events-menu'
import './events-page.css'
import VideoFeed from '../../components/events-feed/videos-feed'

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