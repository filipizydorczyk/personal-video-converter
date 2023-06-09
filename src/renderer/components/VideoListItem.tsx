import React, { FC } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Row, Col, Button, Badge } from 'react-bootstrap';

type VideoListItemProps = {
  name: string;
  path: string;
  url: string;
  isDisabled?: boolean;
  onClick?: (path: string) => void;
  onCutHanlder?: (path: string) => void;
  onDeleteHandler?: (path: string) => void;
  onConvertHandler?: (path: string, target: 'mp4' | 'mov') => void;
};

const VideoListItem: FC<VideoListItemProps> = ({
  name,
  path,
  url,
  isDisabled = false,
  onClick = () => {},
  onCutHanlder = () => {},
  onDeleteHandler = () => {},
  onConvertHandler = () => {},
}) => {
  const itemClickHandler = () => {
    if (!isDisabled) onClick(url);
  };

  return (
    <Row className="px-2 py-1 align-items-center bg-hover-light border-radius-15">
      <Col onClick={itemClickHandler}>
        <p className="m-0">
          {path.includes('.CUT') && <Badge bg="secondary">CUT</Badge>} {name}
        </p>
      </Col>
      <Col className="px-1" xs="auto">
        <Button
          className="p-1"
          variant="success"
          disabled={isDisabled}
          onClick={() => onConvertHandler(path, 'mp4')}
        >
          mp4
        </Button>
      </Col>
      <Col className="px-1" xs="auto">
        <Button
          className="p-1"
          variant="success"
          disabled={isDisabled}
          onClick={() => onConvertHandler(path, 'mov')}
        >
          mov
        </Button>
      </Col>
      <Col className="px-1" xs="auto">
        <Button
          className="p-1"
          variant="secondary"
          disabled={isDisabled}
          onClick={() => onCutHanlder(path)}
        >
          <Icon.Scissors />
        </Button>
      </Col>
      <Col className="px-1" xs="auto">
        <Button
          className="p-1"
          variant="danger"
          disabled={isDisabled}
          onClick={() => onDeleteHandler(path)}
        >
          <Icon.Trash />
        </Button>
      </Col>
    </Row>
  );
};

export default VideoListItem;
