import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryAxis,
  VictoryBrushContainer,
} from 'victory';


export default class VictoryZoom extends Component {

  constructor() {
    super();
    this.state = {
      zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
    };
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    const xAxisTicmarks = () => {
      let tickmarks = []
      const {userJoyData} = this.props
      userJoyData.map(x => tickmarks.push(x.key))
      return tickmarks
    }
    return (
      <div>
        <VictoryChart width={300} height={200} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.props.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={this.props.userJoyData}
              x="key"
              y="b"
            />
            <VictoryAxis tickValues={xAxisTicmarks()} tickCount={3} tickFormat={date => date.toLocaleString('en-us', { day: 'numeric', month:'short', year: 'numeric' })}/>
            

          </VictoryChart>
          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={300} height={100} scale={{ x: "time" }}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={this.props.zoomDomain}
                onBrushDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={this.props.userJoyData}
              x="key"
              y="b"
            />
          </VictoryChart>
      </div>
    );
  }
}