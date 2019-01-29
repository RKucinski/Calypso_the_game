/*eslint-disable*/
import React from 'react';
import { PropTypes } from 'prop-types';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import treasureMap from '../assets/navBar/treasureMap.png';
import rudder from '../assets/navBar/rudder.png';

import settings from '../assets/navBar/settings.png';
import '../css/NavbarResponsive.scss';

const NavbarResponsive = ({ path }) => (
  <Navbar className="fixed-adapt" color="dark" light>
    <div className="bloc">
      <Nav className="fs" navbar justified>
        <NavItem className={path === '/maplist' ? 'active' : ''}>
          <NavLink className="nav-link" to="/maplist">
            <img className="navBarIco" src={treasureMap} alt="Treasure Map" />
          </NavLink>
        </NavItem>
        <NavItem className={path === '/creatorProfile' ? 'active' : ''}>
          <NavLink className="nav-link" to="/creatorProfile">
            <img className="navBarIco" src={'/Trident.png'} alt="Creator Profile" />
          </NavLink>
        </NavItem>
        <NavItem className={path === '/playerprofile' ? 'active' : ''}>
          <NavLink className="nav-link" to="/playerprofile">
            <img className="navBarIco" src={rudder} alt="Player Profile" />
          </NavLink>
        </NavItem>
        <NavItem className={path === '/member' ? 'active' : ''}>
          <NavLink className="nav-link" to="/member">
            <img className="navBarIco" src={settings} alt="Settings" />
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </Navbar>
);

NavbarResponsive.propTypes = {
  path: PropTypes.instanceOf(String).isRequired,
};

export default NavbarResponsive;
