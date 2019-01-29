/* eslint-disable */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import MapBanner from './MapBanner';
import MapImage from './MapImage';
import MapDescriptif from './MapDescriptif';
import MapComment from './MapComment';
import NavbarResponsive from './NavbarResponsive';
import CommentsPost from './CommentsPost';
import UserBanner from './UserBanner';
import { withRouter } from 'react-router';
import { withFullscreen } from '../context/FullscreenContext';

import '../css/DetailMap.scss';

class DetailMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			mapdetail: { userID: { pseudo: '' } }
		};
		this.getComments();
		this.getMap();
	}

	getMap = () => {
		const { match } = this.props;
		const url = `/api/map/${match.params.id}`;
		axios.get(url).then(response => {
			this.setState({
				// ...this.state,
				mapdetail: response.data
			});
		});
	};

	getComments = () => {
		const { match } = this.props;
		const url = `/api/map/${match.params.id}/comments/`;
		axios.get(url).then(response => {
			this.setState({
				// ...this.state,
				comments: response.data.reverse()
			});
		});
	};

	render() {
		const { comments } = this.state;
		const { match } = this.props;
		const { mapdetail } = this.state;
		return (
			<Container className="detailMap">
				<UserBanner />
				<Row>
					<Col lg={{ size: 6, offset: 1 }} className="infoMapCol">
						<div className="completeMapDetail">
							<MapBanner map={mapdetail} />
							<MapImage map={mapdetail} />
							<MapDescriptif map={mapdetail} />
							<Button className="boutonPlay">
								<div
									className="play"
									onClick={() => {
										this.props.setFullscreen();
										this.props.history.push(`/game/${match.params.id}`);
									}}
								>
									Jouer
								</div>
							</Button>
						</div>
					</Col>
					<Col lg={{ size: 3, offset: 1 }} className="commentAreaCol">
						<div className="commentArea">
							<CommentsPost getComments={this.getComments} mapId={match.params.id} map={mapdetail} />
							{comments.length > 0 ? <MapComment mapComments={comments} /> : null}
						</div>
					</Col>
				</Row>
				<NavbarResponsive />
			</Container>
		);
	}
}

DetailMap.propTypes = {
	match: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(withFullscreen(DetailMap));
