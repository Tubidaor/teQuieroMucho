import React, { Component } from 'react';
import './Slider.css'



export default class Slider extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      value: 50,
      id: this.props.id
    }
  }

  componentDidMount() {

    let slider = document.getElementById(this.state.id);
  
    this.setState({
      value: slider.value
    })

  }

  handleChange = (e) => {
    let value = e.target.value
    
    this.setState({
      value
    })
  }

  render() {
    
    
    return (
      <div className="slideCon"> 
        <input
          type="range"
          min="0"
          max="100"
          defaultValue={this.state.value}
          value={this.state.value}
          className="slider"
          onInput={this.handleChange}
          onChange={this.handleChange}
          id={this.props.id}
          step="1"
        />
          <p>
            {this.props.face}: <span id="demo">{this.state.value}</span>
          </p>
      </div>
    )
  }
}