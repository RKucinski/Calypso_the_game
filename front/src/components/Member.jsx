/* eslint-disable */
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import '../css/Member.scss';
import Introduction from './Introduction';
import axios from '../../node_modules/axios';
import UserBanner from './UserBanner';
import NavbarResponsive from './NavbarResponsive';
import image1 from '../avatars/avatar_1.png';
import image2 from '../avatars/avatar_2.png';
import image3 from '../avatars/avatar_3.png';
import image4 from '../avatars/avatar_4.png';
import image5 from '../avatars/avatar_5.png';
import '../css/Introduction.scss';
class Member extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			pseudo: '',
			birthday: '',
			avatar_id: '',
			redirect: false,
			redirect2: false
		};
		this.getInfoPlayer();
		this.getInfoUser();
	}

	getInfoPlayer = () => {
		axios
			.get('/api/member/my_profile', {
				headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
			})
			.then(response => {
				if (response.data.length > 0) {
					this.setState({
						firstname: response.data[0].firstname,
						lastname: response.data[0].lastname,
						pseudo: response.data[0].pseudo,
						birthday: response.data[0].birthday,
						avatar_id: response.data[0].avatar_id
					});
				} else {
					this.setState({ redirect: true });
				}
			});
	};

	getInfoUser = () => {
		axios
			.get('/api/member/me', {
				headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
			})
			.then(response => {
				this.setState({
					email: response.data[0].email
				});
			});
	};

	goToEdit = () => {
		this.setState({ redirect2: true });
	};

	myAvatar = () => {
		if (this.state.avatar_id === '1') {
			return <img src={image1} width="100px" height="100px" />;
		}
		if (this.state.avatar_id === '2') {
			return <img src={image2} width="100px" height="100px" />;
		}
		if (this.state.avatar_id === '3') {
			return <img src={image3} width="100px" height="100px" />;
		}
		if (this.state.avatar_id === '4') {
			return <img src={image4} width="100px" height="100px" />;
		}
		if (this.state.avatar_id === '5') {
			return <img src={image5} width="100px" height="100px" />;
		}
	};

	render() {
		const { redirect, redirect2 } = this.state;
		if (redirect) {
			return <Redirect to="/CreateProfile" />;
		}
		if (redirect2) {
			return <Redirect to="/MemberEdit" />;
		}
		return (
			<Container>
				<UserBanner />
				<Introduction />
				<div className="test">
					<Col lg={3} md={6} sm={6} xs={12} className="containerAuth">
						<fieldset>
							<legend>Mon Compte</legend>
							<br />
							<FormGroup controlId="name">
								<ControlLabel>Prénom : {this.state.firstname}</ControlLabel>
							</FormGroup>
							<FormGroup controlId="lastname">
								<ControlLabel>Nom : {this.state.lastname}</ControlLabel>
							</FormGroup>
							<FormGroup controlId="pseudo">
								<ControlLabel>Pseudo : {this.state.pseudo}</ControlLabel>
							</FormGroup>
							<FormGroup controlId="birthday">
								<ControlLabel>Date de naissance : {this.state.birthday}</ControlLabel>
							</FormGroup>
							<FormGroup controlId="avatar_id">
								<ControlLabel>Avatar Sélectionné : {this.state.avatar_id}</ControlLabel>
								<div>{this.myAvatar()}</div>
							</FormGroup>
							<FormGroup controlId="email">
								<ControlLabel>Email : {this.state.email}</ControlLabel>
							</FormGroup>
							<Button className="button" onClick={this.goToEdit} type="submit">
								Modifier
							</Button>
						</fieldset>
						<NavbarResponsive />
					</Col>
				</div>
			</Container>
		);
	}
}

export default Member;
