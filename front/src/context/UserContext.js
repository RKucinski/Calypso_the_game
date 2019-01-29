/* eslint-disable */

import React, { Component, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export default class UserProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {}
		};
		this.getUser();
	}

	getUser = () => {
		axios.get('/api/member', {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		}).then(response => {
			this.setState({
				userData: response.data[0]
			});
		});
	};

	render() {
		return <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>;
	}
}

export const withUser = Component => props => (
	<UserContext.Consumer>{value => <Component {...props} {...value} />}</UserContext.Consumer>
);
