import React from 'react';
import './Faces.css'

export default function Happy(props) {

  return(
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
        <p className="joyFaceP">joy</p>
        <input type="radio" className="faceInput" name="emotion" value={this.props.value1}></input>
    </div>
  )
}