import React from 'react';
import { PropTypes } from 'prop-types';
import { Container } from 'reactstrap';
/*eslint-disable*/
import '../css/CreatorProfile.scss';
import UserBanner from './UserBanner';
import AvatarBanner from './AvatarBanner';
import GodMap from './GodMap';
import NavbarResponsive from './NavbarResponsive';

const CreatorProfile = ({ match }) => (
  <div>
    {console.log(match.url)}
    <Container className="container-fluid container">
      <UserBanner link="/playerprofile" />
      <AvatarBanner match={match} />
      <GodMap />
      <NavbarResponsive path={match.path} />
    </Container>
  </div>
);

CreatorProfile.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default CreatorProfile;
