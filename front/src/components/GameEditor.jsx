import React, { Component } from 'react';
import Phaser, { Game } from 'phaser';
import { Redirect } from 'react-router';
// import IsoInteractionExample from '../gameEngine/IsoInteractionExample';
import SceneGame from '../gameEngine/editor/SceneGame';
import SceneAssets from '../gameEngine/editor/SceneAssets';
import SceneMenu from '../gameEngine/editor/SceneMenu';

class GameEditor extends Component {
  constructor(props) {
    super(props);
    this.phaserContainer = React.createRef();
    this.game = null;
    this.state = {
      redirect: false,
    };
  }

  // Configuration de la game

  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 800,
      // pixelArt: true,
      // backgroundColor: '#808080',
      scene: [
        new SceneGame({
          map: [[3, 3], [3, 12], [3, 12]],
        }),
        SceneAssets,
        new SceneMenu({ endAction: this.endAction }),
      ],
      // scene: new SceneGame({
      //   map: [
      //     [3, 3],
      //     [3, 12],
      //     [3, 12],
      //   ],
      // }),

      // scene: new sceneTest(),
      parent: this.phaserContainer,
      render: {
        transparent: true,
        autoResize: true,
      },
      scaleMode: Phaser.ScaleManager ? Phaser.ScaleManager.RESIZE : false,
    };

    this.game = new Game(config);
  }

  endAction = (map) => {
    console.log(map);
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { redirect } = this.state;
    if (redirect === true) {
      return <Redirect to="/creatorProfile" />;
    }

    return <div ref={this.phaserContainer} />;
  }
}

export default GameEditor;
