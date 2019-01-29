import React, { Component } from 'react';
/*eslint-disable*/
import '../css/PlayerProfile.scss';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import { withPlayer } from '../context/PlayerContext';
import rudder from '../assets/navBar/rudder.png';
import pirateFull from '../assets/pirates.png';
import cardItems from '../assets/navBar/cardItems.png';
class PlayerProfileChar extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render() {
		const { dropdownOpen } = this.state;

		return (
			<div>
				<div className="player-info equipment">
					<Row className="rowPlayerProfil">
						<Col xs="3" sm="3" className="equipment-col">
							<img className="equipment-box" src={cardItems} alt="equipment box" />
							<img className="equipment-box" src={cardItems} alt="equipment box" />
						</Col>

						<Col xs="6" sm="6" className="piratesImg">
							<img src={pirateFull} alt="pirate avatar" />
						</Col>

						<Col xs="3" sm="3" className="equipment-col">
							<img className="equipment-box" src={cardItems} alt="equipment box" />
							<img className="equipment-box" src={cardItems} alt="equipment box" />
						</Col>
					</Row>
				</div>
				<Row>
					<Col sm={{ size: 6, offset: 8 }} xs={{ size: 6, offset: 3 }}>
						<Dropdown className="dropdown-i" isOpen={dropdownOpen} toggle={this.toggle}>
							<DropdownToggle caret>Trier vos items</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>Armes</DropdownItem>
								<DropdownItem>Boucliers</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Col>
				</Row>

				<div className="player-inventory">
					<Col className="equipment-row">
						<Col md="12">
							<img className="equipment-box-i" src={cardItems} alt="equipment box" />
							<img className="equipment-box-i" src={cardItems} alt="equipment box" />
							<img className="equipment-box-i" src={cardItems} alt="equipment box" />
							<img className="equipment-box-i" src={cardItems} alt="equipment box" />
						</Col>
						<Col md="12">
							<img className="equipment-box-i" src={cardItems} alt="equipment box" />
							<img className="equipment-box-i" src={cardItems} alt="equipment box" />
							<img className="equipment-box-i" src={cardItems} alt="equipment box" />
							<img className="equipment-box-i" src={cardItems} alt="equipment box" />
						</Col>
						<Col />
					</Col>
				</div>
			</div>
		);
	}
}

export default withPlayer(PlayerProfileChar);
