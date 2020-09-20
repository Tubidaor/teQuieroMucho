import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import { JournalServices } from '../../Services/APIServices'
import { forEach } from 'lodash';




// const dataA = [
//   { x: "Personal Drones", y: 57 },
//   { x: "Smart Thermostat", y: 40 },
//   { x: "Television", y: 38 },
//   { x: "Smartwatch", y: 37 },
//   { x: "Fitness Monitor", y: 25 },
//   { x: "Tablet", y: 19 },
//   { x: "Camera", y: 15 },
//   { x: "Laptop", y: 13 },
//   { x: "Phone", y: 12 }
// ];

// const dataB = dataA.map((point) => {
//   const y = Math.round(point.y + 3 * (Math.random() - 0.5));
//   return { ...point, y };
// });

const width = 400;
const height = 400;

export default class StackedBars extends Component {

    constructor(props) {
      super(props)
      this.state = {
        dataA: [],
        // dataB: []
      }
    }
  

  componentDidMount() {
    JournalServices.getJournalData()
      .then(journals => {
        let words = []
        for(let i = 0; i < journals.length; i++) {
          words.push(...journals[i].text.split(' '))
        }

        function createWordsObj(wordsArray) {
          let wordsCount = {}
          wordsArray.forEach(key => {
            if(wordsCount.hasOwnProperty(key)) {
              wordsCount[key]++
            } else {
              wordsCount[key] = 1
            }
          })

          return wordsCount
        }

        const wordsObject = createWordsObj(words)

        function createObjForGraph(wordsObj) {
          let graphData = []
          const entries = Object.entries(wordsObj)
          for(const [key, value] of entries) {
            graphData.push({x: ""+key+"", y: value})
          }
          return graphData.sort((a,b) => a.y - b.y)
        }

        const graphData = createObjForGraph(wordsObject).slice(0,15)
        // const graphDataPercent = graphData.map((point) => {
        //   const y = Math.round(point.y + 3 * (Math.random() - 0.5));
        //   return { ...point, y };
        // })

        this.setState({ dataA: graphData })
      })
      .catch(e => this.setState({words: []}))
  }
  //get data
  //arrange journal entries into array of words
  //get word count of distinct words
  //arrange as an data needed for graph.

  render() {
    // console.log(this.state.dataA, this.state.dataB)
    // console.log(dataA)
    const {dataA} = this.state
    return (
      <VictoryChart horizontal
        height={height}
        width={width}
        padding={40}
      >
        <VictoryStack
          style={{ data: { width: 25 }, labels: { fontSize: 15 } }}
        >
          <VictoryBar
            style={{ data: { fill: "orange" } }}
            data={dataA}
            y={(data) => (-Math.abs(data.y))}
            labels={({ datum }) => (`${Math.abs(datum.y)}`)}
          />
          <VictoryBar
            style={{ data: { fill: "orange" } }}
            data={dataA}
            labels={({ datum }) => (`${Math.abs(datum.y)}`)}
          />
        </VictoryStack>

        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 15, fill: "black" }
          }}
          /*
            Use a custom tickLabelComponent with
            an absolutely positioned x value to position
            your tick labels in the center of the chart. The correct
            y values are still provided by VictoryAxis for each tick
          */
          tickLabelComponent={
            <VictoryLabel
              x={width / 2}
              textAnchor="middle"
            />
          }
          tickValues={dataA.map((point) => point.x).reverse()}
        />
      </VictoryChart>
    );
  }
}