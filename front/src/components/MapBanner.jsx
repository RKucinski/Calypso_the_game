import React from 'react';
import '../css/MapBanner.scss';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'reactstrap';

/* eslint-disable */
// <img className="imageYsat" src={imageYsat} alt="Logo : imageYsat" />
const MapBanner = ({ map }) => (
	<Row className="mapBannerRow">
		<Col lg="6" sm="4" md="4" className="bgAvatarBanner">
			<p className="pseudoJoueur">{map.userID.pseudo}</p>
		</Col>
	</Row>
);
MapBanner.propTypes = {
	map: PropTypes.instanceOf(Array).isRequired
};

export default MapBanner;
