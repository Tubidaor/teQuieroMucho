import React, { Component } from 'react';
import VictoryZoom from './LineZoom';
import Spiderweb from './Spiderweb';
import StackedBars from './StackedBars';
import './Graphs.css'


export default class Graphs extends Component {

  
  render() {
    return (
      <div className="graphsCon">
        <VictoryZoom zoomDomain={this.props.zoomDomain} lineZoomData={this.props.lineZoomData}></VictoryZoom>
        <Spiderweb userData={this.props.userData}/>
        <StackedBars/>
      </div>
    )
  }
}