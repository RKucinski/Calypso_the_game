/* eslint-disable */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Fullscreen from 'react-full-screen';
import MapList from './components/MapList';
import DetailMap from './components/DetailMap';
import Auth from './components/Auth';
import Signup from './components/Signup';
import Game from './components/Game';
import GameEditor from './components/GameEditor';
import CreatorProfile from './components/CreatorProfile';
import CreateProfile from './components/CreateProfile';
import PrivateRoute from './components/PrivateRoute';
import PlayerProfile from './components/PlayerProfile';
import './css/App.scss';
import UserProvider from './context/UserContext';
import PlayerProvider from './context/PlayerContext';
import Member from './components/Member';
import MemberEdit from './components/MemberEdit';
import NavbarResponsive from './components/NavbarResponsive';
import GameProvider from './context/GameContext';
import { withFullscreen } from './context/FullscreenContext';
import Victory from './components/Victory';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/CreateProfile" component={CreateProfile} />
          <UserProvider>
            <PlayerProvider>
              <GameProvider>
                <PrivateRoute path="/maplist" component={MapList} />
                <PrivateRoute path="/map/:id" component={DetailMap} />
                <Fullscreen enabled={this.props.isFull}>
                  <Route exact path="/game/:id" component={Game} />
                </Fullscreen>
                <Route exact path="/gameeditor" component={GameEditor} />
                <Route exact path="/navbar" component={NavbarResponsive} />
                <PrivateRoute exact path="/playerprofile" component={PlayerProfile} />
                <PrivateRoute exact path="/creatorProfile" component={CreatorProfile} />
                <PrivateRoute exact path="/member" component={Member} />
                <PrivateRoute exact path="/memberEdit" component={MemberEdit} />
                <PrivateRoute exact path="/victory" component={Victory} />
              </GameProvider>
            </PlayerProvider>
          </UserProvider>
        </Switch>
      </div>
    );
  }
}

export default withFullscreen(App);
