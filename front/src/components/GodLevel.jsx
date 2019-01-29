import React, { Component } from 'react';
import { Row, Progress } from 'reactstrap';
import axios from 'axios';
import '../css/GodLevel.scss';
import pirate from '../assets/pirate.png';

/* eslint-disable */

class GodLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoPlayer: [],
    };
    this.getInfoPlayer();
  }

  getInfoPlayer = () => {
    axios.get('/api/player').then(response => {
      this.setState({
        infoPlayer: response.data,
      });
    });
  };

  render() {
    const { infoPlayer } = this.state;
    return (
      <Row className="rowLevel">
        <img className="imagePirate" src={pirate} width="50px" height="50px" alt="Logo de Pirate" />
        <p className="namePlayer">MODE DIEU</p>
        <Progress value={50}>
          niv
          {infoPlayer[0] ? infoPlayer[0].lvl : null}
        </Progress>
      </Row>
    );
  }
}

export default GodLevel;
