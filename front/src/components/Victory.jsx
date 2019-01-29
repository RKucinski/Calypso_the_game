/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import NavbarResponsive from './NavbarResponsive';
import '../css/Victory.scss';
import UserBanner from './UserBanner';
import { withGame } from '../context/GameContext';
import { Link } from 'react-router-dom';
import cardItems from '../assets/navBar/cardItems.png';
class Victory extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.newgold, 'victory');
    const gold = this.props.newgold;
    console.log(gold, 'gold');
    return (
      <div className="victoryBg">
        <UserBanner link="/CreatorProfile" />
        <Container>
          <Col lg="5">
            <Row className="victoryContainer">
              <Col lg="12" xs="12">
                <p className="ResultGame">Victoire !</p>
              </Col>
              <Col className="monnaie" lg="12" xs="12">
                <p width="auto">
                  +10 <img className="" src={'Groupe84.png'} alt="equipment box" />
                </p>
              </Col>

              <Col xs="3" sm="3">
                <img className="itemVictory" src={cardItems} alt="equipment box" />
              </Col>
              <Col xs="3" sm="3">
                <img className="itemVictory" src={cardItems} alt="equipment box" />
              </Col>
              <Col xs="3" sm="3">
                <img className="itemVictory" src={cardItems} alt="equipment box" />
              </Col>

              <Col xs="6">
                <Link className="victoryButton" to={`/map/5c08322c1580796027ae8b5f`}>
                  <Button className="icon">Quitter</Button>
                </Link>
              </Col>

              <Col xs="6">
                <Button className="icon">Rejouer</Button>
              </Col>
            </Row>
          </Col>
        </Container>
        <NavbarResponsive />
      </div>
    );
  }
}

export default withGame(Victory);
