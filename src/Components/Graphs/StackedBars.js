import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend
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
          if(journals[i].text.match(/\b(\w+)\b/g) === null) {
            i++
          } else {
          words.push(...journals[i].text.match(/\b(\w+)\b/g))
          }
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
            graphData.push({x:`${key}`, y: value})
          }
          console.log('graphdata', graphData)
          return graphData.sort((a,b) => a.y - b.y)
        }

        const graphData = createObjForGraph(wordsObject).slice(-15)

        this.setState({ dataA: graphData })
      })
      .catch(e => console.log(e))
  }


  render() {
 
    const {dataA} = this.state
    return (
      <VictoryChart horizontal
        height={height}
        width={width}
        padding={{top: 70, bottom: 40, left: 40, right: 40}}
        style={{
          parent: {
            background: "rgba( 0, 0, 0, .75)",
            width: "90%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10px",
            border: "2px solid rgba(210, 217, 220, 1)",
            borderRadius: 10
          }
        }
        }
      >
        <VictoryLegend x={110} y={5}
          title={"Word Usage In Journals"}
          centerTitle
          orientation="horizontal"
          itemsPerRow={0}
          gutter={70}
          // height={10}
          width={50}
          style={{
            border: { borderRadius: "10px", stroke: "#0652c5"},
            title: {fill: "rgba(210, 217, 220, 1)", fontSize: 12, fontFamily: "Buda, cursive", fontWeight: "bold", marginTop: 40  },
          }}
          data={[
            { name: "", symbol: { fill: "transparent" } },
            { name: "", symbol: { fill: "transparent" } },
          ]}

        />
        <VictoryStack
          style={{ data: { width: 25 }, labels: { fontSize: 15, fill: "rgba(210, 217, 220, 1)", fontFamily: "Buda, cursive" } }}
        >
          <VictoryBar
            style={{ data: { fill: "rgba(6, 82, 197, .7)" } }}
            data={dataA}
            y={(data) => (-Math.abs(data.y))}
            labels={({ datum }) => (`${Math.abs(datum.y)}`)}
          />
          <VictoryBar
            style={{ data: { fill: "rgba(6, 82, 197, .7)" } }}
            data={dataA}
            labels={({ datum }) => (`${Math.abs(datum.y)}`)}
          />
        </VictoryStack>

        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 15, fill: "rgba(210, 217, 220, 1)", fontFamily: "Buda, cursive" }
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