import React, { Component } from 'react'
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend
} from 'victory'
import { JournalServices } from '../../services/api-services'

const width = 400
const height = 400

export default class StackedBars extends Component {

    constructor(props) {
      super(props)
      this.state = {
        dataA: [],
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
          return graphData.sort((a,b) => a.y - b.y)
        }

        const graphData = createObjForGraph(wordsObject).slice(-15)

        this.setState({ dataA: graphData })
      })
      .catch(e => this.context.setError(e))
  }

  render() {

    const {dataA} = this.state
    
    return (
      <VictoryChart horizontal
        height={height}
        width={width}
        padding={{top: 70, bottom: 40, left: 40, right: 40}}
        style={
          {
            parent: {
              background: "rgba( 0, 0, 0, .75)",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: -75,
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
          width={50}
          style={
            {
              title: {
                fill: "rgba( 255, 255, 0, .8)",
                fontSize: 12,
                fontFamily: "Buda, cursive",
                fontWeight: "bold",
                marginTop: 40 
              }
            }
          }
          data={
            [
              { name: "", symbol: { fill: "transparent" } },
              { name: "", symbol: { fill: "transparent" } }
            ]
          }
        />
        <VictoryStack
          style={
            {
              data: { width: 25 },
              labels: {
                fontSize: 15,
                fill: "rgba(210, 217, 220, 1)",
                fontFamily: "Buda, cursive"
              }
            }
          }
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
          style={
            {
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: {
                fontSize: 15,
                fill: "rgba(210, 217, 220, 1)",
                fontFamily: "Buda, cursive"
              }
            }
          }
          tickLabelComponent={
            <VictoryLabel
              x={width / 2}
              textAnchor="middle"
            />
          }
          tickValues={dataA.map((point) => point.x).reverse()}
        />
      </VictoryChart>
    )
  }
}