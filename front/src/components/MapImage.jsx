import React from 'react';
import '../css/MapImage.scss';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'reactstrap';

const MapImage = ({ map }) => (
  <div>
    <Row>
      <Col>
        <img className="mapDet" src={map.picture} alt="Logo : mapDet" />
      </Col>
    </Row>

    <Row>
      <Col>
        <p className="nameMap">{map.name}</p>
      </Col>
    </Row>
  </div>
);

MapImage.propTypes = {
  map: PropTypes.instanceOf(Array).isRequired,
};

export default MapImage;
