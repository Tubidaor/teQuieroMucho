import React, { Component } from 'react';
import Questions from '../../Components/Questions/Questions';
import './OpeningQs.css';


export default class OpeningQs extends Component {

  

  render() {

    return (
      <section className="qSection">
        <Questions qType="opening"/>
      </section>
    )
  }
}