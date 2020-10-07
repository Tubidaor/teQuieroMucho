import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryGroup,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryTheme,
  VictoryArea,
  VictoryLegend
} from 'victory';



const characterData = [
  { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
  { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
  { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 }
];

export default class Spiderweb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      maxima: []
    };
  }

  componentDidMount() {
  //   // console.log(this.processData(this.totalAvgScores(this.props.spiderData)))
 

  
  }


  
  getMaxima(data) {
    // console.log(data)
    if(data.length === 0) {
      return []
    }
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
    
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processData(data) {
    const maxByGroup = this.getMaxima(data);
    // console.log(data)
    // console.log(maxByGroup)
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    // console.log(data.map((datum) => makeDataArray(datum)))
    return data.map((datum) => makeDataArray(datum));
  }

  totalAvgScores = (userQuestionData) => {
    let joy = []
    let disgust = []
    let sadness = []
    let anger = []
    let fear = []
    let mood = []

    // console.log("uQData", userQuestionData)
    const question = userQuestionData
    // userQuestionData.forEach(question => {
    if(question === undefined) {
      return []
    } else {
      for (let i = 0; i < question.joy.length; i++) {
        joy.push(question.joy[i].y)
        disgust.push(question.disgust[i].y)
        sadness.push(question.sadness[i].y)
        anger.push(question.anger[i].y)
        fear.push(question.fear[i].y)
        mood.push(question.mood[i].y)

      }

    // })
    
    function arrAvg(arr) {
      return arr.reduce((a,b) => a + b, 0) / arr.length
    }
    const avgJoy = Math.round(arrAvg(joy))
    const avgDisgust = Math.round(arrAvg(disgust))
    const avgSadness = Math.round(arrAvg(sadness))
    const avgAnger = Math.round(arrAvg(anger))
    const avgFear = Math.round(arrAvg(fear))
    const avgMood = Math.round(arrAvg(mood))
    
    return [
      { Joy: 100, Disgust: 100, Sadness: 100, Anger: 100, Fear: 100, Overall: 100 },
      { Joy: avgJoy, Disgust: avgDisgust, Sadness: avgSadness, Anger: avgAnger, Fear: avgFear, Overall: avgMood }
    ]
  }
  }


  render() {

    // console.log(this.props.userData)
    // const userQuestions = []
    let {userData} = this.props
    // if( this.props.page === 'relationship') {
    //   userData = this.props.relData
    // }
    // userData.map(qs => userQuestions.push(qs.question))
    // const uniqueUserQuestions = userQuestions.filter((v, i, a) => a.indexOf(v) === i);
    // const userQuestionData = [] 
    // uniqueUserQuestions.map(qs => userQuestionData.push({ question: qs, joy:[], disgust:[], sadness: [], anger: [], fear: [], mood: [] }))
    
    
    // const userJoyData = []
    // userData.map(data => userJoyData.push({key: new Date(data.date_created), b: data.joy } ))
    // if(userQuestionData.length > 0) {
    //   for(let i = 0; i < userQuestionData.length; i++) {
        
    //     for(let j = 0; j < userData.length; j++) {
    //       if(userQuestionData[i].question === userData[j].question) {
    //         userQuestionData[i].joy.push({x: userData[j].date_created, y: userData[j].joy})
    //         userQuestionData[i].disgust.push({x: userData[j].date_created, y: userData[j].disgust})
    //         userQuestionData[i].sadness.push({x: userData[j].date_created, y: userData[j].sadness})
    //         userQuestionData[i].anger.push({x: userData[j].date_created, y: userData[j].anger})
    //         userQuestionData[i].fear.push({x: userData[j].date_created, y: userData[j].fear})
    //         userQuestionData[i].mood.push({x: userData[j].date_created, y: userData[j].mood})

    //       }
    //     }
    //   }
    // }

    
    const spiderData = this.processData(this.totalAvgScores(userData))
    const maxima = this.getMaxima(this.totalAvgScores(userData))

 

    return (
      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [ 0, 1 ] }}
        padding={{ top: 70, bottom: 60 }}
        style={
          {
            parent: {
              backgroundColor: "rgba( 0, 0, 0, .75)",
              borderRadius: 10,
              border: "2px rgba(210, 217, 220, 1) solid",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
            }
          }

        }
      >
        <VictoryLegend x={80} y={5}
            title={userData == undefined ?'':userData.question}
            centerTitle
            orientation="horizontal"
            itemsPerRow={2}
            gutter={70}
            height={20}
            width={50}
            style={{
              labels: { fill: "rgba(210, 217, 220, 1)", fontSize: 6 },
              border: { borderRadius: "10px", stroke: "#0652c5"},
              title: {fill: "rgba(210, 217, 220, 1)", fontSize: 10, fontFamily: "Buda, cursive", fontWeight: "bold" },
            }}
            data={[
              { name: "", symbol: { fill: "transparent" } },
              { name: "Total Avg", symbol: { fill: "rgba(6, 82, 197, .7)" } },
            ]}
        />
        <VictoryGroup colorScale={["transparent", "#0652c5"]}
          style={{ data: { fillOpacity: 0.4, strokeWidth: 2 } }}
        >
          {
              spiderData.map((data, i) => {
                  return <VictoryArea key={i} data={data}/>;
                })
              
          }
        </VictoryGroup>
      {
        Object.keys(maxima).map((key, i) => {
          return (
            <VictoryPolarAxis key={i} dependentAxis
              style={{
                axisLabel: { padding: 30, fill: "rgba(210, 217, 220, 1)" },
                axis: { stroke: "none" },
                grid: { stroke: "rgba(210, 217, 220, 1)", strokeWidth: 0.25, opacity: 0.5 },
                tickLabels: { 
                  fill: "rgba(210, 217, 220, 1)",
                  fontSize: 14,
                  padding: 2,
                  fontFamily: "Buda, cursive",
                  fontWeight: "bold"
              }}
            }
              tickLabelComponent={
                <VictoryLabel labelPlacement="vertical"/>
              }
              labelPlacement="perpendicular"
              axisValue={i + 1} label={key}
              tickFormat={(t) => Math.ceil(t * maxima[key])}
              tickValues={[0.25, 0.5, 0.75, 1]}
            />
          );
        })
      }
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ""}
          style={{
            axis: { stroke: "none" },
            grid: { stroke: "grey", opacity: 0.5, fill: "rgba( 0, 0, 0, .75)" }
          }}
        />

      </VictoryChart>
    );
  }
}
