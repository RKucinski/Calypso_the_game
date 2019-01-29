/* eslint-disable */
import React, { Component, createContext } from 'react';
import axios from 'axios';
import { withUser } from './UserContext';

export const PlayerContext = createContext();

class PlayerProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: this.props.userData.userId,
			playerData: {}
		};
		this.getPlayer();
	}

	getPlayer = () => {
		axios.get(`/api/player/${this.state.userID}`).then(response => {
			this.setState({
				playerData: response.data
			});
		});
	};

	render() {
		this.state.userID = this.props.userData.userId

		return <PlayerContext.Provider value={this.state}>{this.props.children}</PlayerContext.Provider>;
	}
}

export const withPlayer = Component => props => (
	<PlayerContext.Consumer>{value => <Component {...props} {...value} />}</PlayerContext.Consumer>
);

export default withUser(PlayerProvider);
