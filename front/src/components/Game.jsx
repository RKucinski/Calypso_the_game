/*eslint-disable*/
import React, { Component } from 'react';
import { Redirect } from 'react-dom';
import axios from 'axios';
import Phaser from 'phaser';
import sceneLevel from '../gameEngine/scenes/sceneLevel';
import sceneScore from '../gameEngine/scenes/sceneScore';
import { withGame } from '../context/GameContext';
import layerObstacle from '../gameEngine/maps/map1/layerObstacle';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      width: window.innerWidth,
      height: window.innerHeight,
      sceneLevel: {
        map: {
          layerGround: '',
          layerObstacle: layerObstacle,
        },
      },
      sceneScore: {
        counterGold: 0,
        counterKey: 0,
      },
    };
  }

  componentDidMount() {
    this.getGameMap();
  }
  startGame(layerGround) {
    console.log(this.state.sceneLevel.map.layerGround[0], this.state.sceneLevel.map.layerObstacle);
    let config = {
      type: Phaser.AUTO,
      width: this.state.width,
      height: this.state.height,
      backgroundColor: '#cccccc',

      scene: [
        new sceneLevel({
          map: {
            layerGround: layerGround.layerGround,
            layerObstacle: layerObstacle,
          },

          gameData: this.state.gameData,
          endTheGame: this.endTheGame,
        }),
        new sceneScore({
          counterGold: this.state.sceneScore.counterGold,
          counterKey: this.state.sceneScore.counterKey,
        }),
      ],

      parent: 'game',
    };
    new Phaser.Game(config);
    console.log(layerGround.layerGround);
  }

  getGameMap = () => {
    const { match } = this.props;
    const url = `/api/map/${match.params.id}/game`;
    axios.get(url).then(response => {
      const sceneLevelTmp = this.state.sceneLevel;
      sceneLevelTmp.map.layerGround = response.data;
      this.setState({
        sceneLevel: sceneLevelTmp,
      });
      this.startGame(response.data[0]);
    });
  };

  endTheGame = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    this.state.gameData = this.props;
    const { redirect } = this.state;
    if (redirect === true) {
      return <Redirect to="/victory" />;
    }
    return <div>{<div id="game" />}</div>;
  }
}

export default withGame(Game);
