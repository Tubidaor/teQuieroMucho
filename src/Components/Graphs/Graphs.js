import React, { Component } from 'react';
import VictoryZoom from './LineZoom';
import Spiderweb from './Spiderweb';
import StackedBars from './StackedBars';



export default class Graphs extends Component {

  
  render() {
    return (
      <div className="graphsCon">
        <VictoryZoom zoomDomain={this.props.zoomDomain} userJoyData={this.props.userJoyData}></VictoryZoom>
        <Spiderweb/>
        <StackedBars/>
      </div>
    )
  }
}