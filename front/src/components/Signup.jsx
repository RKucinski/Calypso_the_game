/* eslint-disable */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, InputGroup, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import API from '../helpers/API';
import '../css/Introduction.scss';
import Introduction from './Introduction';
import { Col } from 'reactstrap';
class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			cpassword: '',
			redirect: false
		};
		this.handleChange.bind(this);
		this.send.bind(this);
	}
	send = event => {
		if (this.state.email.length === 0) {
			return;
		}
		if (this.state.password.length === 0 || this.state.password !== this.state.cpassword) {
			return;
		}
		const _send = {
			pseudo: this.state.pseudo,
			email: this.state.email,
			password: this.state.password
		};

		API.signup(_send).then(
			data => {
				localStorage.setItem('token', data.data.token);
				this.setState({ redirect: true });
			},
			error => {
				console.log(error);
			}
		);
	};

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};
	handle = event => {
		if (event.keyCode === 13) {
			event.preventDefault();
			this.send();
		}
	};

	render() {
		const { pseudo, email, password, cpassword } = this.state;
		const { redirect } = this.state;
		if (redirect) {
			return <Redirect to="/CreateProfile" />;
		}
		return (
			<div className="Auth">
				<Introduction />
				<div className="test">
					<Col lg={3} md={6} sm={6} xs={12} className="containerAuth">
						<fieldset>
							<legend>Inscription</legend>

							<FormGroup controlId="pseudo">
								<ControlLabel>Pseudo</ControlLabel>
								<FormControl autoFocus type="pseudo" value={pseudo} onChange={this.handleChange} />
							</FormGroup>
							<FormGroup controlId="email">
								<ControlLabel>E-mail</ControlLabel>
								<FormControl
									autoFocus
									type="email"
									value={email}
									onChange={this.handleChange}
									placeholder="mon-email@gmail.com"
								/>
							</FormGroup>
							<FormGroup controlId="password">
								<ControlLabel>Mot de passe</ControlLabel>
								<FormControl
									value={password}
									onChange={this.handleChange}
									type="password"
									placeholder="*******"
								/>
							</FormGroup>
							<FormGroup controlId="cpassword">
								<ControlLabel>Confirmation</ControlLabel>
								<FormControl
									value={cpassword}
									onChange={this.handleChange}
									type="password"
									placeholder="*******"
									onKeyDown={this.handle}
								/>
							</FormGroup>
							<FormGroup>
								<Button className="validSign" onClick={this.send} block type="submit">
									Inscription
								</Button>
							</FormGroup>
						</fieldset>
					</Col>
				</div>
			</div>
		);
	}
}

export default Signup;
