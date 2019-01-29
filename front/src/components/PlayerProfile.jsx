/*eslint-disable*/
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../css/PlayerProfile.scss';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col,
} from 'reactstrap';
import classnames from 'classnames';
import UserBanner from './UserBanner';
import AvatarBanner from './AvatarBanner';
import NavbarResponsive from './NavbarResponsive';
import { withPlayer } from '../context/PlayerContext';
import PlayerProfileBoat from './PlayerProfileBoat';
import PlayerProfileChar from './PlayerProfileChar';

class PlayerProfile extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { match } = this.props;
    const { activeTab } = this.state;

    return (
      <Container className="profileContainer">
        <UserBanner />
        <AvatarBanner match={match} />
        <div className="d-md-none profileContainer-mobile">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  this.toggle('1');
                }}
              >
                Joueur
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  this.toggle('2');
                }}
              >
                Bateau
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <PlayerProfileChar />
            </TabPane>
            <TabPane tabId="2">
              <PlayerProfileBoat />
            </TabPane>
          </TabContent>
        </div>
        <Row className="d-none d-md-flex px-3 px-md-5 px-lg-4 px-xl-5">
          <Col xs="6">
            <PlayerProfileChar />
          </Col>
          <Col xs="6">
            <PlayerProfileBoat />
          </Col>
        </Row>
        <NavbarResponsive path={match.path} />
      </Container>
    );
  }
}

PlayerProfile.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default withPlayer(PlayerProfile);
