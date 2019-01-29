import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Nav } from 'reactstrap';
import API from '../helpers/API';
/*eslint-disable*/
import '../css/UserBanner.scss';
import axios from '../../node_modules/axios';
import { withUser } from '../context/UserContext';
import disconnect from '../assets/off-button.png';
import Gold from '../assets/Groupe84.png';
class UserBanner extends Component {
	constructor(props) {
		super(props);
		this.disconnect.bind(this);
		this.state = {
			pseudo: '',
			gold: '',
			redirect1: false,
			redirect2: false
		};
		this.getInfoPlayer();
	}

	disconnect = () => {
		API.logout();
		this.setState({ redirect2: true });
	};

	getInfoPlayer = () => {
		axios
			.get('/api/member/my_profile', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			})
			.then(response => {
				if (response.data.length > 0) {
					this.setState({
						pseudo: response.data[0].pseudo,
						gold: response.data[0].gold
					});
				} else {
					this.setState({ redirect1: true });
				}
			});
	};

	render() {
		const { pseudo, gold } = this.state;
		const { redirect1, redirect2 } = this.state;
		if (redirect1) {
			return <Redirect to="/CreateProfile" />;
		}
		if (redirect2) {
			return <Redirect to="/" />;
		}
		return (
			<Nav className="userbanner">
				<p className="namePlayer">{pseudo}</p>
				{/* <p className="nbr_abo">244 Abonnés</p> */}
				<div>
					<p className="nbr_abo">{gold} </p>
					<img className="" src={Gold} alt="equipment box" />
				</div>

				<button className="buttonBanner" onClick={this.disconnect} type="submit">
					<img className="disconnectIco" src={disconnect} alt="Déconexion" />
				</button>
			</Nav>
		);
	}
}

export default withUser(UserBanner);
