import React, { Component } from 'react';
import RegForm from '../../Components/Registration/RegForm';

export default class RegPage extends Component {

  render() {

    return (
      <section className="regSection">
        <RegForm></RegForm>
      </section>
    )
  }
}