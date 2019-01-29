import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col,
} from 'reactstrap';
/*eslint-disable*/
import '../css/MapList.scss';
import axios from 'axios';
import Map from './Map';
import NavbarResponsive from './NavbarResponsive';
import UserBanner from './UserBanner';

class MapList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapsList: [],
      dropdownOpen: false,
      types: 'Toutes',
    };
    this.getMaps();
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  change = e => {
    this.setState({
      types: e.target.value,
    });
  };

  getMaps = () => {
    axios.get('/api/map').then(response => {
      this.setState({
        mapsList: response.data.reverse(),
      });
    });
  };

  render() {
    const { match } = this.props;
    const type = ['Toutes', 'Eau', 'Terre', 'Feu'];
    const { mapsList, dropdownOpen, types } = this.state;
    /* eslint-disable */
    return (
      <Container>
        <UserBanner />
        <h1 className="listMap">Les cartes</h1>
        <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>Type: {types}</DropdownToggle>
          <DropdownMenu>
            {type.map(e => (
              <DropdownItem onClick={this.change} value={e} key={e.toString()}>
                {e}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Row>
        <Col md="10" className="bgContainMaplist">
        <Row>

          {mapsList
            .filter(map => map.type === types || types === '' || types === 'Toutes')
            .map((map, i) => (
              <Map key={[i]} map={map} />
            ))}

        </Row>
        </Col>
        </Row>
        <NavbarResponsive path={match.path} />
      </Container>
    );
  }
}

MapList.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default MapList;
