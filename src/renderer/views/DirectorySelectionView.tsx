import React, { useEffect } from 'react';
import { Button, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useElectronService } from 'renderer/services/electron';
import { useNavigate } from 'react-router-dom';
import { useVaultContext } from '../contexts/vault-context';
import { useQueryClient } from 'react-query';

const DirectorySelectionView = () => {
  const nav = useNavigate();
  const vault = useVaultContext();
  const queryClient = useQueryClient();
  const { sendElectronMessage } = useElectronService();

  useEffect(() => {
    if (vault.path !== null) {
      queryClient.invalidateQueries(['videos']);
      nav('/');
    }
  }, [vault.path]);

  const handleDirPickerClick = () => {
    sendElectronMessage('directory-picker', []);
  };

  return (
    <Row className="m-0 center-v">
      <Icon.Wallet size={50} />
      <h1 className="text-center user-select-none">No directory selected</h1>
      <p className="text-center user-select-none">
        Please select workspace directory
      </p>
      <Button onClick={handleDirPickerClick} className="w-auto mx-auto">
        Select directory
      </Button>
    </Row>
  );
};

export default DirectorySelectionView;
