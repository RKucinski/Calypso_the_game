import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button, Form, FormGroup, Input,
} from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../css/DetailMap.scss';

/*eslint-disable*/
class CommentsPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			infoProfile: [{ _id: '', pseudo: '' }]
		};
		this.getInfoProfile();
	}

	getInfoProfile = () => {
		axios
			.get('/api/member/my_profile', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			})
			.then(response => {
				this.setState({
					infoProfile: response.data
				});
			});
	};

	postComment = () => {
		const { value, infoProfile } = this.state;
		const { match, mapId, getComments } = this.props;

		axios
			.post(`/api/map/${match.params.id}/comments`, {
				userAvatar: '',
				userID: infoProfile[0]._id,
				idMap: mapId,
				userPseudo: infoProfile[0].pseudo,
				comment: value
			})
			.then(() => {
				getComments();
				this.setState({
					...this.state,
					value: ''
				});
			});
	};

	handleChange = e => {
		this.setState({ value: e.target.value });
	};

	render() {
		const { value } = this.state;

		return (
			<Form>
				<FormGroup controlId="formBasicText">
					<Input type="text" value={value} placeholder="Post your comment" onChange={this.handleChange} />
				</FormGroup>
				<Button onClick={this.postComment} className="boutonPlay">
					Envoyer
				</Button>
			</Form>
		);
	}
}

CommentsPost.propTypes = {
	match: PropTypes.instanceOf(Object).isRequired,
	getComments: PropTypes.instanceOf().isRequired,
	mapId: PropTypes.instanceOf().isRequired
};

export default withRouter(CommentsPost);
