import React, { Component } from 'react'
import './question-faces.css'
import Slider from '../slider/slider'
import  { JournalServices } from '../../services/api-services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleRight,
  faHome
} from '@fortawesome/free-solid-svg-icons'

export default class QuestionFaces extends Component {

  constructor(props) {
    super(props)
    this.state = {
      joy: {
        value: 100,
        max: 100
      },
      disgust: {
        value: 0,
        max: 0
      },
      sadness: {
        value: 0,
        max: 0
      },
      anger: {
        value: 0,
        max: 0
      },
      fear: {
        value: 0,
        max: 0
      },
      currentQ: 0
    }
  }

  
  updateState = (state) => {
    let noJoySum = state.disgust.value + state.sadness.value + state.anger.value
      + state.fear.value
    let noDisgust = state.joy.value + state.sadness.value + state.anger.value
      + state.fear.value
    let noSad = state.joy.value + state.disgust.value + state.anger.value
      + state.fear.value
    let noAnger = state.joy.value + state.sadness.value + state.disgust.value
      + state.fear.value
    let noFear = state.joy.value + state.sadness.value + state.anger.value
      + state.disgust.value
    let maxJoy = 100 - noJoySum
    let maxDisgust = 100 - noDisgust
    let maxSadness = 100 - noSad
    let maxAnger = 100 - noAnger
    let maxFear = 100 - noFear

    state.joy.max = maxJoy
    state.disgust.max = maxDisgust
    state.sadness.max = maxSadness
    state.anger.max = maxAnger
    state.fear.max = maxFear

    this.setState({
      joy: state.joy,
      disgust: state.disgust,
      sadness: state.sadness,
      anger: state.anger,
      fear: state.fear
    })
  }

  changeJoy = (value) => {
    let state = this.state
    value = parseInt(value)
    state.joy.value = value
    this.updateState(state)
  }
    
  changeDisgust = (value) => {
    let state = this.state
    value = parseInt(value)
    state.disgust.value = value
    this.updateState(state)
  }

  changeSadness = (value) => {
    let state = this.state
    value = parseInt(value)
    state.sadness.value = value
    this.updateState(state)
  }

  changeAnger = (value) => {
    let state = this.state
    value = parseInt(value)
    state.anger.value = value
    this.updateState(state)
  }

  changeFear = (value) => {
    let state = this.state
    value = parseInt(value)
    state.fear.value = value
    this.updateState(state)
  }

  handleQSubmit = (e, question_id) => {
    e.preventDefault()
    const {
      joy,
      disgust,
      sadness,
      anger,
      fear
    } = document.getElementById('qsForm')
    const mood = (
      100 - disgust.value - sadness.value - anger.value - fear.value
    )
    const answer = {
      question_id,
      joy: joy.value,
      disgust: disgust.value,
      sadness: sadness.value,
      anger: anger.value,
      fear: fear.value,
      mood
    }

    JournalServices.submitAnswer(answer)

    this.setState(
      {
        currentQ: this.state.currentQ + 1,
        currentQId: this.props.questions[this.state.currentQ].question_id
      }
    )
  }

  handleEndSubmit = (e, question_id) => {
    e.preventDefault()
    const {
      joy,
      disgust,
      sadness,
      anger,
      fear
    } = document.getElementById('qsForm')
    const mood = joy.value - (
      disgust.value - sadness.value - anger.value - fear.value
    )
    const answer = {
      question_id,
      joy: joy.value,
      disgust: disgust.value,
      sadness: sadness.value,
      anger: anger.value,
      fear: fear.value,
      mood
    }

    JournalServices.submitAnswer(answer)

    this.setState({
      currentQ: 0
    })

    this.props.handlePushURL()

  }

  render() {

    let questions = this.props.questions
    let currentQ = this.state.currentQ
    
    return (
      <div className={`facesCon id${questions[currentQ].id}`}>
        <h3 className="facesH3">{questions[currentQ].question}</h3>
        <form className="qForm" id={`qsForm`} >
          <div className="faceInputCon">
            <div className="joyFace">
              <ul className="joyFaceEyesCon">
                <li className='joyFaceLeftEye'>
                </li>
                <li className="joyFaceRightEye">
                </li>
              </ul>
              <ul className="joyFaceSmileCon">
                <li className="joyFaceSmile">
                </li>
              </ul>
            </div>
            <Slider
              maxValue={this.state.joy.max}
              face="Joy"
              name="joy"
              id="joyInput"
              value={this.state.joy.value}
              changeOnSlider={this.changeJoy}
            />
          </div>
          <div className="faceInputCon">
            <div className="disgustFace">
              <ul className="disgustFaceEyesCon">
                <li className='disgustFaceLeftEye'>
                </li>
                <li className="disgustFaceRightEye">
                </li>
              </ul>
              <ul className="disgustFaceSmileCon">
                <li className="disgustFaceSmile">
                </li>
              </ul>
            </div>
            <Slider
              maxValue={this.state.disgust.max}
              face="Disgust"
              name="disgust"
              id="disgustInput"
              value={this.state.disgust.value}
              changeOnSlider={this.changeDisgust}
            />
          </div>
          <div className="faceInputCon">
            <div className="sadFace">
              <ul className="sadFaceEyesCon">
                <li className='sadFaceLeftEye'>
                </li>
                <li className="sadFaceRightEye">
                </li>
              </ul>
              <ul className="sadFaceSmileCon">
                <li className="sadFaceSmile">
                </li>
              </ul>
            </div>
            <Slider
              maxValue={this.state.sadness.max}
              face="Sadness"
              name="sadness"
              id="sadnessInput"
              value={this.state.sadness.value}
              changeOnSlider={this.changeSadness}
              />
          </div>
          <div className="faceInputCon">
            <div className="angryFace">
              <ul className="angryFaceEyesCon">
                <li className='angryFaceLeftEye'>
                </li>
                <li className="angryFaceRightEye">
                </li>
              </ul>
              <ul className="angryFaceSmileCon">
                <li className="angryFaceSmile">
                </li>
              </ul>
            </div>
            <Slider
              maxValue={this.state.anger.max}
              face="Anger"
              name="anger"
              id="angerInput"
              value={this.state.anger.value}
              changeOnSlider={this.changeAnger}
            />
          </div>
          <div className="faceInputCon">
            <div className="scaredFace">
              <ul className="scaredFaceEyesCon">
                <li className='scaredFaceLeftEye'>
                </li>
                <li className="scaredFaceRightEye">
                </li>
              </ul>
              <ul className="scaredFaceSmileCon">
                <li className="scaredFaceSmile">
                </li>
              </ul>
            </div>
            <Slider
              maxValue={this.state.fear.max}
              face="Fear"
              name="fear"
              id="fearInput"
              value={this.state.fear.value}
              changeOnSlider={this.changeFear}
            />
          </div>
          <div className='qBtnCon'>
            {
              this.props.lastQ !== questions[currentQ].question_id &&
              <button
                onClick={event =>
                  this.handleQSubmit(event,questions[currentQ].question_id)
                }
                form={`qsForm`}
                className="facesBtnNext"
                type="submit"
              >
              <FontAwesomeIcon icon={faChevronCircleRight}/>
              </button>
            }
            {
              this.props.lastQ === questions[currentQ].question_id &&
              <button
                onClick={event =>
                  this.handleEndSubmit(event,questions[currentQ].question_id)
                }
                form={`qsForm`}
                className="facesBtnEnd"
                type="submit"
              >
                <FontAwesomeIcon icon={faHome}/>
              </button>
            }
          </div>
        </form>
      </div>
    )
  }
}