import React, { Component } from 'react'
import VictoryZoom from './line-zoom'
import Spiderweb from './spider-web'
import './graphs.css'


export default class Graphs extends Component {
  
  render() {

    return (
      <div className="graphsCon">
        <VictoryZoom
          zoomDomain={this.props.zoomDomain}
          lineZoomData={this.props.lineZoomData}
        >
        </VictoryZoom>
        <Spiderweb userData={this.props.userData}/>
      </div>
    )
  }
}