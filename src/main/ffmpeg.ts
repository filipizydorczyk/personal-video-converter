import { spawn } from 'child_process';

import * as path from 'path';
import { changeFileExt } from './util';

const useFfmpegRepository = () => {
  const convertFile = (
    filePath: string,
    target: 'mp4' | 'mov',
    event: Electron.IpcMainEvent
  ) => {
    return new Promise((resolve, reject) => {
      const targetPath = changeFileExt(filePath, `.${target}`);

      const convertProc = spawn(
        'ffmpeg',
        ['-y', '-i', `"${filePath}"`, `"${targetPath}"`],
        {
          shell: true,
        }
      );

      convertProc.stdout.on('data', (data) => {
        event.reply('log-status', `${data}`);
      });

      convertProc.stderr.on('data', (data) => {
        event.reply('log-status', `${data}`);
      });

      convertProc.on('error', (error) => {
        reject(error);
      });

      convertProc.on('close', () => {
        resolve(null);
      });
    });
  };

  return { convertFile };
};

export { useFfmpegRepository };
