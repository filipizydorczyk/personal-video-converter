import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { HashLoader } from 'react-spinners';

type StateProps = {
  message?: string;
  loading?: boolean;
};

const State: FC<StateProps> = ({ message = '', loading = false }) => {
  return (
    <Row className="m-0 align-items-center">
      <Col className="px-2 py-0 m-0" xs="auto">
        {!loading && <Icon.Check size={20} color="#198754" />}
        {loading && <HashLoader size={15} color="#6c757d" />}
      </Col>
      <Col className="p-0 m-0">
        {!loading && <p className="p-0 m-0 font-weight-bold">Updated</p>}
        {loading && (
          <p className="p-0 m-0 font-weight-bold">
            Updating
            {message && message.length > 0 ? ` - ${message.slice(0, 80)}` : ''}
          </p>
        )}
      </Col>
    </Row>
  );
};

export default State;
