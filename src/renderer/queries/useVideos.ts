import type { ConvertDTO, VideoFile, CutVideoDTO } from '../../main/event';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useElectronService } from '../services/electron';

const useVideos = (path: string | null) => {
  const { sendElectronMessage, waitForElectronMessage } = useElectronService();
  const queryClient = useQueryClient();

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

  const cutMutation = useMutation<void, Error, CutVideoDTO>(async (dto) => {
    return new Promise(async (resolve) => {
      sendElectronMessage('cut-video', [dto]);
      await waitForElectronMessage('cut-video');
      queryClient.refetchQueries(['videos']);
      resolve();
    });
  }, {});

  return { query, deleteMutation, convertMutation, cutMutation };
};

export default useVideos;
