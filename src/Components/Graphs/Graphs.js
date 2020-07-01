import React, { Component } from 'react';
import VictoryZoom from './LineZoom';
import Spiderweb from './Spiderweb';
import StackedBars from './StackedBars';



export default class Graphs extends Component {

  
  render() {
    return (
      <div className="graphsCon">
        <VictoryZoom></VictoryZoom>
        <Spiderweb/>
        <StackedBars/>
      </div>
    )
  }
}