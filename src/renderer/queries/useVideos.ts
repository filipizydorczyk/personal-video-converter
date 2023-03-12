import { ConvertDTO, VideoFile } from '../../main/event';
import { useMutation, useQuery } from 'react-query';
import { onElectronMessage, sendElectronMessage } from '../utils';

const useVideos = (path: string | null) => {
  const fetchVideos = () => {
    return new Promise<VideoFile[]>((resolve, reject) => {
      if (path) {
        sendElectronMessage('list-files', [path]);
        onElectronMessage('list-files', (arg) => {
          resolve(arg as VideoFile[]);
        });
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
    return new Promise((resolve) => {
      sendElectronMessage('format-video', [dto]);
      onElectronMessage('format-video', () => {
        resolve();
      });
    });
  }, {});

  return { query, deleteMutation, convertMutation };
};

export default useVideos;
