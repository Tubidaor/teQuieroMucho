import React, { Component } from 'react'
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryAxis,
  VictoryLegend,
  VictoryLabel
} from 'victory'

export default class VictoryZoom extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
    }
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain })
  }

  render() {
    const { lineZoomData } = this.props

    function xAxisTicmarks() {
      let tickmarks = []
      if(lineZoomData === undefined) {
        return []
      }
      lineZoomData.joy.map(x => tickmarks.push(x.x))
      return tickmarks
    }

    function formatDate(date) {
      const d = new Date(date)
      const month = d.getMonth() + 1
      const year = d.getFullYear()
      const day = d.getDate()
      const fDate = month + "/" + day + "/" + year
        return fDate
      }
      
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
      
      function axis(lineZoomData) {
        if(lineZoomData === undefined) {
          return []
        }
        return (
          <VictoryAxis
            tickValues={xAxisTicmarks()}
            tickCount={4}
            label= "Date"
            width={50}
            tickFormat={t => formatDate(t)}
            style={
              { 
                tickLabels: { 
                fill: "rgba(210, 217, 220, 1)",
                fontSize: 8,
                padding: 2,
                fontFamily: "Buda, cursive",
                fontWeight: "bold"
              },
              axisLabel: {
                fontSize: 10,
                fontFamily: "Buda, cursive",
                fill: "rgba(210, 217, 220, 1)",
                fontWeight: "bold",
                padding: 35,
              },
              }
            }
              tickLabelComponent={<VictoryLabel dy={15} angle={-45}/>}
          />
        )
      }

    return (
      <div className="zoomCon">
        <VictoryChart width={300} height={200} scale={{ x: "time" }}
          // containerComponent={
          //   <VictoryZoomContainer
          //     zoomDimension="x"
          //     zoomDomain={this.props.zoomDomain}
          //     onZoomDomainChange={this.handleZoom.bind(this)}
          //   />           
          // }
          style={{
            parent: {
              border: "2px solid rgba(210, 217, 220, 1)",
              borderRadius: "10px",
              backgroundColor: "rgba( 0, 0, 0, .75)",
              
            },

          }}
        >
          <VictoryLegend x={30} y={5}
            title={questionTitle()}
            orientation="horizontal"
            gutter={5}
            height={50}
            width={50}
            borderPadding={{ top: 0, bottom: 0, left: 2, right: 2 }}
            style={{
              labels: { fill: "rgba(210, 217, 220, 1)", fontSize: 6 },
              title: {
                fill: "rgba(255, 255, 0, .8)",
                fontSize: 9,
                fontFamily: "Buda, cursive",
                fontWeight: "bold",
                stroke: "none" 
              }
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
            />
            <VictoryLine
              style={{
                data: { stroke: "#6ad3c2" }
              }}
              data={userDisData()}
            />
            <VictoryLine
              style={{
                data: { stroke: "#87cefa" }
              }}
              data={userSadData()}
            />
            <VictoryLine
              style={{
                data: { stroke: "#ff0000" }
              }}
              data={userAngerData()}
            />
            <VictoryLine
              style={{
                data: { stroke: "#8510d8" }
              }}
              data={userFearData()}
            />
            <VictoryLine
              style={{
                data: { stroke: "#0652c5" }
              }}
              data={userMoodData()}
            />
            <VictoryAxis
              dependentAxis={true}
              style={
                { 
                  tickLabels: { 
                    fill: "rgba(210, 217, 220, 1)",
                    fontSize: 8,
                    padding: 2,
                    fontFamily: "Buda, cursive",
                    fontWeight: "bold"
                  },
                  grid: {
                    stroke: "rgba(210, 217, 220, 1)",
                    strokeWidth: 0.5
                  }
                }}
              tickFormat={t => `${t}%`}
            />
            {
              axis(lineZoomData)
            }
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
    )
  }
}