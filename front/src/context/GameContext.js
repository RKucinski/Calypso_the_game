/* eslint-disable */
import React, { Component, createContext } from 'react';
import { withUser } from './UserContext';
import { withPlayer } from './PlayerContext';
import axios from 'axios';

export const GameContext = createContext();

class GameProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: {},
      userData: this.props.userData,
      playerData: this.props.playerData,
      newgold: 0,
      newkey: 0,
      setGold: this.setGold,
      setKey: this.setKey,
    };
  }

  //Mise à jour des données dans la db

  updateGameData = () => {
    let newgold = this.state.userData.gold + this.state.newgold;
    axios
      .put(
        '/api/member/modify_values',
        {
          gold: newgold,
        },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      )
      .then(response => {
        console.log('updateGold :', response);
      });
  };

  //Récupération données dans le jeu

  setGold = data => {
    this.setState({
      newgold: data,
    });
    this.updateGameData();
  };
  setKey = data => {
    this.setState({
      newkey: data,
    });
  };

  render() {
    this.state.userData = this.props.userData;
    this.state.playerData = this.props.playerData;
    return <GameContext.Provider value={this.state}>{this.props.children}</GameContext.Provider>;
  }
}

export const withGame = Component => props => (
  <GameContext.Consumer>{value => <Component {...props} {...value} />}</GameContext.Consumer>
);

export default withUser(withPlayer(GameProvider));
