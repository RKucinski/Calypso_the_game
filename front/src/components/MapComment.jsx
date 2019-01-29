import React from 'react';
import { PropTypes } from 'prop-types';
/*eslint-disable*/
import '../css/MapComment.scss';
import { Row, Col } from 'reactstrap';

const MapComment = ({ mapComments }) => (
  <div>
    <Row>
      <Col>
        <p className="numberComment">{`${mapComments.length} commentaires`}</p>
      </Col>
    </Row>

    {mapComments.map(comm => (
      <Row className="commentRow">
        <Col>
          <p className="CommentPseudo">{comm.userPseudo}</p>
          <p className="Comment">{comm.comment}</p>
        </Col>
      </Row>
    ))}
  </div>
);

MapComment.propTypes = {
  mapComments: PropTypes.instanceOf(Array).isRequired,
};

export default MapComment;
