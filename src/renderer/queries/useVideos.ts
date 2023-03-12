import { ConvertDTO, VideoFile } from '../../main/event';
import { useMutation, useQuery } from 'react-query';
import { useElectronService } from '../services/electron';

const useVideos = (path: string | null) => {
  const { sendElectronMessage, waitForElectronMessage } = useElectronService();

  const fetchVideos = () => {
    return new Promise<VideoFile[]>(async (resolve, reject) => {
      if (path) {
        sendElectronMessage('list-files', [path]);
        const videos: VideoFile[] = (await waitForElectronMessage(
          'list-files'
        )) as VideoFile[];
        resolve(videos);
      } else {
        resolve([]);
      }
    });
  };

  const query = useQuery<VideoFile[], Error>(['videos'], fetchVideos, {
    enabled: path !== null,
  });

  const deleteMutation = useMutation<void, Error, string>(
    async (path) =>
      new Promise((resolve) => {
        setTimeout(resolve, 5000);
      }),
    {}
  );

  const convertMutation = useMutation<void, Error, ConvertDTO>(async (dto) => {
    return new Promise(async (resolve) => {
      sendElectronMessage('format-video', [dto]);
      await waitForElectronMessage('format-video');
      resolve();
    });
  }, {});

  return { query, deleteMutation, convertMutation };
};

export default useVideos;
