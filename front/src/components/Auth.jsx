import React, { Component } from 'react';
import {
  Button, FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import { Col } from 'reactstrap';
import API from '../helpers/API';
import Introduction from './Introduction';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange.bind(this);
    this.send.bind(this);
  }

  send = () => {
    const { email } = this.state;
    const { password } = this.state;
    if ({ email }.length === 0) {
      return;
    }
    if ({ password }.length === 0) {
      return;
    }
    API.login(email, password).then(
      (data) => {
        localStorage.setItem('token', data.data.token);
        window.location = '/maplist';
      },
      (error) => {
        console.log(error);
      },
    );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleChangePage = () => {
    window.location = '/signup';
  };
  /*eslint-disable*/
  handle = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.send();
    }
  };

  render() {
    const { email } = this.state;
    const { password } = this.state;
    return (
      <div className="Auth">
        <Introduction />

        <div className="test">
          <Col lg={3} md={6} sm={6} xs={12} className="containerAuth">
            <fieldset>
              <legend>Authentification</legend>

              <FormGroup controlId="email">
                <ControlLabel>Identifiant</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="mon-email@email.com"
                />
              </FormGroup>
              <FormGroup controlId="password">
                <ControlLabel>Mot de passe</ControlLabel>
                <FormControl
                  value={password}
                  onChange={this.handleChange}
                  type="password"
                  placeholder="*******"
                  onKeyDown={this.handle}
                />
              </FormGroup>
              <FormGroup>
                <Button className="validation" onClick={this.send} block type="submit">
                  Connexion
                </Button>
                <br />
                <Button className="validation" onClick={this.handleChangePage}>
                  Je ne suis pas inscrit
                </Button>
              </FormGroup>
            </fieldset>
          </Col>
        </div>
      </div>
    );
  }
}

export default Auth;
