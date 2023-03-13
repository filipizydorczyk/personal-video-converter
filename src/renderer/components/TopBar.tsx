import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

type TopBarProps = {
  onClose?: () => void;
  onMin?: () => void;
  onMax?: () => void;
};

const TopBar: FC<TopBarProps> = ({
  onClose = () => {},
  onMin = () => {},
  onMax = () => {},
}) => {
  const style: React.CSSProperties = {
    height: '25px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  };

  return (
    <div className="w-100 d-flex flex-row-reverse" style={style}>
      <Button
        className="mx-1 mb-0 mt-1 py-1 px-2"
        variant="danger"
        onClick={onClose}
      ></Button>
      <Button
        className="mx-1 mb-0 mt-1 py-1 px-2"
        variant="warning"
        onClick={onMax}
      ></Button>
      <Button
        className="mx-1 mb-0 mt-1 py-1 px-2"
        variant="secondary"
        onClick={onMin}
      ></Button>
    </div>
  );
};

export default TopBar;
