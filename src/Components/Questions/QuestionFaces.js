import React, { Component } from 'react';
import './QuestionFaces.css';


export default class QuestionFaces extends Component {

  render() {

  
  return (
    <div className={`facesCon id${this.props.id}`}>
      <h3 className="facesH3">{this.props.question}</h3>
      <form className="qForm" id={`id${this.props.id}`} action="">
      <div className="greatFace">
        <ul className="greatFaceEyesCon">
          <li className='greatFaceLeftEye'>
          </li>
          <li className="greatFaceRightEye">
          </li>
        </ul>
        <ul className="greatFaceSmileCon">
          <li className="greatFaceSmile">
          </li>
        </ul>
        <p className="greatFaceP">Great</p>
        <input type="radio" className="faceInput" name="emotion" value={this.props.value1}></input>
      </div>
      <div className="happyFace">
        <ul className="happyFaceEyesCon">
          <li className='happyFaceLeftEye'>
          </li>
          <li className="happyFaceRightEye">
          </li>
        </ul>
        <ul className="happyFaceSmileCon">
          <li className="happyFaceSmile">
          </li>
        </ul>
        <p className="happyFaceP">Happy</p>
        <input type="radio" className="faceInput" name="emotion" value={this.props.value2}></input>
      </div>
      <div className="neutralFace">
        <ul className="neutralFaceEyesCon">
          <li className='neutralFaceLeftEye'>
          </li>
          <li className="neutralFaceRightEye">
          </li>
        </ul>
        <ul className="neutralFaceSmileCon">
          <li className="neutralFaceSmile">
          </li>
        </ul>
        <p className="neutralFaceP">Neutral</p>
        <input type="radio" className="faceInput" name="emotion" value={this.props.value3}></input>
      </div>
      <div className="distressedFace">
        <ul className="distressedFaceEyesCon">
          <li className='distressedFaceLeftEye'>
          </li>
          <li className="distressedFaceRightEye">
          </li>
        </ul>
        <ul className="distressedFaceSmileCon">
          <li className="distressedFaceSmile">
          </li>
        </ul>
        <p className="distressedFaceP">Distressed</p>
        <input type="radio" className="faceInput" name="emotion" value={this.props.value4}></input>
      </div>
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
        <p className="sadFaceP">Sad</p>
        <input type="radio" className="faceInput" name="emotion" value={this.props.value5}></input>
      </div>
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
        <p className="angryFaceP">Angry</p>
        <input type="radio" className="faceInput" name="emotion" value={this.props.value6}></input>
      </div>
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
        <p className="scaredFaceP">Scared</p>
        <input type="radio" className="faceInput" name="emotion" value={this.props.value7}></input>
      </div>
      </form>
      <button onClick={this.props.handleQSubmit} form={`id${this.props.id}`} className="facesButton" type="submit">Submit</button>
    </div>
  )
}
}