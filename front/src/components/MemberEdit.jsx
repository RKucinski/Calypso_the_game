/*eslint-disable*/
const passwordHash = require('../../../back/node_modules/password-hash');
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FormGroup, Button } from 'react-bootstrap';
import { Label, Input } from 'reactstrap';
import '../css/MemberEdit.scss';
import axios from 'axios';
import Introduction from './Introduction';
import UserBanner from './UserBanner';
import NavbarResponsive from './NavbarResponsive';
import image1 from '../avatars/avatar_1.png';
import image2 from '../avatars/avatar_2.png';
import image3 from '../avatars/avatar_3.png';
import image4 from '../avatars/avatar_4.png';
import image5 from '../avatars/avatar_5.png';

class MemberEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      pseudo: '',
      birthday: '',
      avatar_id: '',
      email: '',
      gold: '',
      password: '',
    };
    this.getInfoPlayer();
    this.getInfoUser();
  }

  getInfoPlayer = () => {
    axios
      .get('/api/member/my_profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        this.setState({
          firstname: response.data[0].firstname,
          lastname: response.data[0].lastname,
          pseudo: response.data[0].pseudo,
          birthday: response.data[0].birthday,
          avatar_id: response.data[0].avatar_id,
          gold: response.data[0].gold,
        });
      });
  };

  getInfoUser = () => {
    axios
      .get('/api/member/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        this.setState({
          email: response.data[0].email,
          password: response.data[0].password,
        });
      });
  };

  modifyValues = event => {
    if (this.state.email.length === 0) {
      return;
    }
    axios.put(
      '/api/member/modify_values',
      {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        pseudo: this.state.pseudo,
        birthday: this.state.birthday,
        avatar_id: this.state.avatar_id,
        gold: this.state.gold,
      },
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      },
    );
    axios
      .put(
        '/api/member/modify_user',
        {
          pseudo: this.state.pseudo,
          email: this.state.email,
          password: this.state.password,
        },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      )
      .then((window.location = '/member'));
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
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
    }
  };

  render() {
    return (
      <Container>
        <UserBanner />
        <Introduction />
        <br />
        <fieldset>
          <legend>Editer mon profil</legend>
          <br />
          <FormGroup>
            <Label for="name">Prénom</Label>
            <Input
              type="text"
              name="name"
              id="firstname"
              placeholder={this.state.firstname}
              onChange={this.handleChange}
              onKeyDown={this.handle}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastname">Nom</Label>
            <Input
              type="text"
              name="lastname"
              id="lastname"
              placeholder={this.state.lastname}
              onChange={this.handleChange}
              onKeyDown={this.handle}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pseudo">Pseudo</Label>
            <Input
              type="text"
              name="pseudo"
              id="pseudo"
              placeholder={this.state.pseudo}
              onChange={this.handleChange}
              onKeyDown={this.handle}
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
              onKeyDown={this.handle}
            />
          </FormGroup>
          <FormGroup>
            <Label for="avatar_id">Avatar actuel : {this.state.avatar_id}</Label>
            <div inline="true" className="avatarField">
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
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder={this.state.email}
              onChange={this.handleChange}
              onKeyDown={this.handle}
            />
          </FormGroup>
          <Button className="button" onClick={this.modifyValues} type="submit">
            Valider
          </Button>
        </fieldset>
        <NavbarResponsive />
      </Container>
    );
  }
}

export default MemberEdit;
