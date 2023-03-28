import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useVideos } from '../queries';
import VideoPlayer, { VideoRangeDTO } from '../components/VideoPlayer';
import { useVaultContext } from '../contexts/vault-context';
import VideoList from '../components/VideoList';
import State from '../components/State';
import { useElectronService } from '../services/electron';

const VideoDashboardView = () => {
  const nav = useNavigate();
  const vault = useVaultContext();
  const { onElectronMessage } = useElectronService();
  const { query, deleteMutation, convertMutation, cutMutation } = useVideos(
    vault.path
  );
  const [video, setVideo] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [cutRange, setCutRange] = useState<VideoRangeDTO | null>(null);

  useEffect(() => {
    if (vault.path === null) nav('/vault');
  }, []);

  onElectronMessage('log-status', (data) => {
    setStatusMsg(`${data}`);
  });

  return (
    <>
      <State
        message={statusMsg}
        loading={
          deleteMutation.isLoading ||
          convertMutation.isLoading ||
          cutMutation.isLoading
        }
      />
      <Row className="p-0 m-0 w-100">
        <Col xs={6} style={{ maxHeight: 'calc(100vh - 50px)' }}>
          <VideoList
            videos={query.data || []}
            isDisabled={
              deleteMutation.isLoading ||
              convertMutation.isLoading ||
              cutMutation.isLoading
            }
            onCutHanlder={(path) => {
              if (cutRange)
                cutMutation.mutate({
                  path,
                  start: cutRange.start,
                  duration: cutRange.duration,
                });
            }}
            onDeleteHandler={(path) => deleteMutation.mutate(path)}
            onConvertHandler={(path, target) =>
              convertMutation.mutate({ path, target })
            }
            onItemClickHandler={(path) => {
              setVideo(path);
              setCutRange(null);
            }}
          />
        </Col>
        <Col xs={6}>
          <VideoPlayer
            video={video}
            onRangeChange={(range) => setCutRange(range)}
          />
        </Col>
      </Row>
    </>
  );
};

export default VideoDashboardView;
