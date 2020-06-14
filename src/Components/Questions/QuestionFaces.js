import React, { Component } from 'react';
import './QuestionFaces.css';
import Slider from '../Slider/Slider';


export default class QuestionFaces extends Component {

  render() {

  
  return (
    <div className={`facesCon id${this.props.id}`}>
      <h3 className="facesH3">{this.props.question}</h3>
      <form className="qForm" id={`id${this.props.id}`} action="">
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
          <Slider face="Joy" id={"joyInput"}></Slider>
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
          <Slider face="Disgust" id={"disgustInput"}></Slider>
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
          <Slider face="Sadness" id={"sadInput"}></Slider>
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
          <Slider face="Anger" id={"angryInput"}></Slider>
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
          <Slider face="Fear" id={"scaredInput"}></Slider>
        </div>

      </form>
      <button onClick={this.props.handleQSubmit} form={`id${this.props.id}`} className="facesButton" type="submit">Submit</button>
    </div>
  )
}
}