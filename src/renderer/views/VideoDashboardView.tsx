import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useVideos } from '../queries';
import VideoPlayer from '../components/VideoPlayer';
import { useVaultContext } from '../contexts/vault-context';
import VideoList from '../components/VideoList';
import State from '../components/State';
import { onElectronMessageTmp } from '../utils';

const VideoDashboardView = () => {
  const nav = useNavigate();
  const vault = useVaultContext();
  const { query, deleteMutation, convertMutation } = useVideos(vault.path);
  const [video, setVideo] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');

  useEffect(() => {
    console.log(deleteMutation.isLoading, convertMutation.isLoading);
    if (vault.path === null) nav('/vault');
  }, [deleteMutation.isLoading, convertMutation.isLoading]);

  onElectronMessageTmp('log-status', (data) => {
    setStatusMsg(`${data}`);
  });

  return (
    <>
      <State
        message={statusMsg}
        loading={deleteMutation.isLoading || convertMutation.isLoading}
      />
      <Row className="p-0 m-0 w-100">
        <Col xs={6} style={{ maxHeight: 'calc(100vh - 50px)' }}>
          <VideoList
            videos={query.data || []}
            isDisabled={deleteMutation.isLoading || convertMutation.isLoading}
            onDeleteHandler={(path) => deleteMutation.mutate(path)}
            onConvertHandler={(path, target) =>
              convertMutation.mutate({ path, target })
            }
            onItemClickHandler={(path) => setVideo(path)}
          />
        </Col>
        <Col xs={6}>
          <VideoPlayer video={video} />
        </Col>
      </Row>
    </>
  );
};

export default VideoDashboardView;
