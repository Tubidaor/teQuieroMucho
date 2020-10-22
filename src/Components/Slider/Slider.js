import React, { Component } from 'react'
import './slider.css'

export default class Slider extends Component {

  handleChange = (e) => {
    let value = e.target.value
    this.props.changeOnSlider(value)
  }

  render() {
    
    return (
      <div className="slideCon"> 
        <input
          type="range"
          min="0"
          max={this.props.maxValue}
          value={this.props.value}
          name={this.props.name}
          className={`slider ${this.props.id}`}
          onInput={this.handleChange}
          onChange={this.handleChange}
          id={this.props.id}
          step="1"
        />
        <div className="sliderValues">
          <p>
            {this.props.face}: 
              <span className="sliderValue">
                {this.props.value}
              </span>
          </p>
          <p>
            Max: <span id="sliderMax">{this.props.maxValue}</span>
          </p>
        </div>
      </div>
    )
  }
}