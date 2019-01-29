/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Map.scss';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
class Map extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { map } = this.props;
		return (
			<Col xs="12" md="6" lg="4" className="mapCol">
				<Card>
					<Link to={`/map/${map._id}`}>
						<CardImg className="mapImage" src={map.picture} alt={map.name} />
					</Link>
					<CardBody>
						<CardTitle className="mapName">{map.name}</CardTitle>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default Map;
