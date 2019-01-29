import React, { Component } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
/*eslint-disable*/
import '../css/GodMap.scss';
import classnames from 'classnames';
import imageMap from '../assets/map.png';
import imageMap2 from '../assets/map2.png';
import cardItems from '../assets/navBar/cardItems.png';
class GodMap extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1'
		};
	}

	toggle(tab) {
		const { activeTab } = this.state;
		if ({ activeTab } !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	/* className={{ factive: { activeTab } === '1' }} */
	/* eslint-disable */
	//bgDieux
	render() {
		const { activeTab } = this.state;
		return (
			<div className="godmap">
				<Row>
					<Col md="8">
						<Row className="row-map">
							<Link className="linkAjoutCarte" to="/gameEditor">
								<button type="button" className="ajoutCarte">
									<p className="signeAjout">+</p>
									Créer une carte
								</button>
							</Link>
						</Row>
						<Nav tabs className="navtabs">
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === '1' })}
									onClick={() => {
										this.toggle('2');
									}}
								>
									Cartes Publiées
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === '2' })}
									onClick={() => {
										this.toggle('1');
									}}
								>
									Inventaire Cartes
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={activeTab}>
							<TabPane tabId="1">
								<Row className="bgDieux">
									<Col md="12" sm="12">
										<img className="imageMap" src={cardItems} alt="Une carte publiée" />

									</Col>
									<Col md="12" sm="12" />
								</Row>
							</TabPane>
							<TabPane tabId="2">
								<Row className="bgDieux">
									<Col md="12" sm="12">
										<img className="imageMap" src={cardItems} alt="Une carte publiée" />

									</Col>
									<Col md="12" sm="12" />
								</Row>
							</TabPane>
						</TabContent>
					</Col>
				</Row>
			</div>
		);
	}
}

export default GodMap;
