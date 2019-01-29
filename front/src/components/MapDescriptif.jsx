import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router';
/*eslint-disable*/
import '../css/Maping.scss';
import { withFullscreen } from '../context/FullscreenContext';
// import drops from '../assets/drops.png';
// import swords from '../assets/swords.png';

/* eslint-disable */
class MapDescriptif extends Component {
  render() {
    return (
      <div className="mapDescriptif">
        <Row>
          <Col className="descriMap">{this.props.map.description}</Col>
        </Row>

        {/* <Row>
          <Col>
            <div className="lvlMap">
              <img className="swords" src={swords} alt="Logo : swords" />
            </div>
            <p className="lvlMap2">Niv 25</p>
          </Col>

          <Col>
            <div className="typeMap">
              <img className="water" src={drops} alt="Logo : drops" />
            </div>
            <p className="typeMap2">Eau</p>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default withRouter(withFullscreen(MapDescriptif));
