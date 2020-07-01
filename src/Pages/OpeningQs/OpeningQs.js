import React, { Component } from 'react';
import Questions from '../../Components/Questions/Questions';


export default class OpeningQs extends Component {


  render() {

    return (
      <section className="qsSection">
        <Questions qType="opening"></Questions>
      </section>
    )
  }
}