/* eslint-disable */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, Button } from 'react-bootstrap';
import { Label, Input } from 'reactstrap';
//import '../css/CreateProfile.scss';
import axios from 'axios';
import Introduction from './Introduction';
import image1 from '../avatars/avatar_1.png';
import image2 from '../avatars/avatar_2.png';
import image3 from '../avatars/avatar_3.png';
import image4 from '../avatars/avatar_4.png';
import image5 from '../avatars/avatar_5.png';
import '../css/Introduction.scss';
class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			firstname: '',
			lastname: '',
			birthday: '',
			avatar_id: '',
			gold: '0',
			pseudo: '',
			redirect: false
		};
		this.getInfoUser();
	}

	getInfoUser = () => {
		axios
			.get('/api/member/me', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			})
			.then(response => {
				this.setState({
					userId: response.data[0]._id,
					pseudo: response.data[0].pseudo
				});
			});
	};

	modifyValues = event => {
		axios
			.put(
				'/api/member/modify',
				{
					userId: this.state.userId,
					firstname: this.state.firstname,
					lastname: this.state.lastname,
					pseudo: this.state.pseudo,
					birthday: this.state.birthday,
					avatar_id: this.state.avatar_id,
					gold: this.state.gold
				},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
				}
			)
			.then(this.setState({ redirect: true }));
	};

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handle = event => {
		if (event.keyCode === 13) {
			event.preventDefault();
			this.modifyValues();
		}
	};

	myAvatar = () => {
		if (this.state.avatar_id === '1') {
			return <img src={image1} />;
		}
		if (this.state.avatar_id === '2') {
			return <img src={image2} />;
		}
		if (this.state.avatar_id === '3') {
			return <img src={image3} />;
		}
		if (this.state.avatar_id === '4') {
			return <img src={image4} />;
		}
		if (this.state.avatar_id === '5') {
			return <img src={image5} />;
		} else {
			return <img src={image1} />;
		}
	};

	render() {
		const { redirect } = this.state;
		if (redirect) {
			return <Redirect to="/maplist" />;
		}
		return (
			<div className="Auth">
				<Introduction />
				<div className="test">
					<Col lg={3} md={6} sm={6} xs={12} className="containerAuth">
						<fieldset onKeyDown={this.handle}>
							<legend>Completez votre profil</legend>
							<br />
							<FormGroup>
								<Label for="name">Prénom</Label>
								<Input type="text" name="name" id="firstname" onChange={this.handleChange} />
							</FormGroup>
							<FormGroup>
								<Label for="lastname">Nom</Label>
								<Input
									type="text"
									name="lastname"
									id="lastname"
									placeholder={this.state.lastname}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="birthday">Date de naissance</Label>
								<Input
									type="text"
									name="birthday"
									id="birthday"
									placeholder={this.state.birthday}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="avatar_id">Sélectionnez un Avatar</Label>
								<div inline className="avatarField">
									<Input
										className="champAvatar"
										type="select"
										name="avatar_id"
										placeholder={this.state.avatar_id}
										onChange={this.handleChange}
										id="avatar_id"
										onKeyDown={this.handle}
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Input>
									<br />
									{this.myAvatar()}
								</div>
							</FormGroup>
							<Button className="button" onClick={this.modifyValues} type="submit">
								Valider
							</Button>
						</fieldset>
					</Col>
				</div>
			</div>
		);
	}
}

export default CreateProfile;
