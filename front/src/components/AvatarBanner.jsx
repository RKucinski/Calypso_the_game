import React from 'react';
import { Row, Col } from 'reactstrap';
/* eslint-disable */
//import pirate from '../assets/pirate.png';
import pirate from '../assets/pirate.png';
import '../css/AvatarBanner.scss';
/*eslint-disable*/
/* <img className="imagePirate" src={pirate} width="50px" height="50px" alt="Logo de Pirate" /> */
const AvatarBanner = match => (
	<Row className="rowLevel">
		<Col lg="3" sm="4" md="4" className="bgAvatarBanner">

			<p className="namePlayer">{match.match.url == '/creatorProfile' ? 'MODE CREATEUR' : 'MODE JOUEUR'}</p>
		</Col>
	</Row>
);

export default AvatarBanner;
