import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryLegend
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
    // const xAxisTicmarks = () => {
    //   let tickmarks = []
    //   const {userJoyData} = this.props
    //   userJoyData.map(x => tickmarks.push(x.key))
    //   return tickmarks
    // }
    const { lineZoomData } = this.props
    
    function userJoyData() {
      if(lineZoomData === undefined) {
        return []
      }
      return lineZoomData.joy
    }
    function userSadData() {
      if(lineZoomData === undefined) {
        return []
      }
      return lineZoomData.sadness
    }
    function userDisData() {
      if(lineZoomData === undefined) {
        return []
      }
      return lineZoomData.disgust
    }
    function userAngerData() {
      if(lineZoomData === undefined) {
        return []
      }
      return lineZoomData.anger
    }
    function userFearData() {
      if(lineZoomData === undefined) {
        return []
      }
      return lineZoomData.fear
    }
    function userMoodData() {
      if(lineZoomData === undefined) {
        return []
      }
      return lineZoomData.mood
    }
    function questionTitle() {
      if(lineZoomData === undefined) {
        return []
      }

      return lineZoomData.question
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
          <VictoryLegend x={50} y={5}
            title={questionTitle()}
            centerTitle
            orientation="horizontal"
            gutter={5}
            height={50}
            width={50}
            style={{
              data: { fill: "blue", stroke: "navy", strokeWidth: 2 },
              labels: { fill: "black", fontSize: 6 },
              border: { stroke: "black" },
              title: {fontSize: 8 }
            }}
            data={[
              { name: "Joy", symbol: { fill: "#ffff00" } },
              { name: "Disgust", symbol: { fill: "#6ad3c2" } },
              { name: "Sadness", symbol: { fill: "#87cefa" } },
              { name: "Anger", symbol: { fill: "#ff0000" } },
              { name: "Fear", symbol: { fill: "#8510d8" } },
              { name: "Overall", symbol: { fill: "#0652c5" } }
              
            ]}
            />
            <VictoryLine
              style={{
                data: { stroke: "#ffff00" }
              }}
              data={userJoyData()}
              name={'Joy'}
              // x="key"
              // y="b"
            />
            <VictoryLine
              style={{
                data: { stroke: "#6ad3c2" }
              }}
              data={userDisData()}
              // x="key"
              // y="b"
            />
            <VictoryLine
              style={{
                data: { stroke: "#87cefa" }
              }}
              data={userSadData()}
              // x="key"
              // y="b"
            />
            <VictoryLine
              style={{
                data: { stroke: "#ff0000" }
              }}
              data={userAngerData()}
            // x="key"
            // y="b"
            />
            <VictoryLine
              style={{
                data: { stroke: "#8510d8" }
              }}
              data={userFearData()}
          // x="key"
          // y="b"
            />
            <VictoryLine
              style={{
                data: { stroke: "#0652c5" }
              }}
              data={userMoodData()}
        // x="key"
        // y="b"
            />

            {/* <VictoryAxis tickValues={xAxisTicmarks()} tickCount={3} tickFormat={date => date.toLocaleString('en-us', { day: 'numeric', month:'short', year: 'numeric' })}/> */}
            

          </VictoryChart>
          {/* <VictoryChart
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
              data={userJoyData()} */}
              {/* // x="key"
              // y="b" */}
            {/* />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" }
              }}
              data={userSadData()} */}
              {/* // x="key"
              // y="b" */}
            {/* />
          </VictoryChart> */}
      </div>
    );
  }
}