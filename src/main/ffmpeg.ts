import { spawn } from 'child_process';

import { changeFileExt, setFilePreExt } from './util';

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

  const cutVideo = (
    filePath: string,
    start: string,
    duration: string,
    event: Electron.IpcMainEvent
  ) => {
    return new Promise((resolve, reject) => {
      const targetPath = setFilePreExt(filePath, 'CUT');
      const convertProc = spawn(
        'ffmpeg',
        [
          '-ss',
          `"${start}"`,
          '-i',
          `"${filePath}"`,
          '-c',
          'copy',
          '-t',
          `"${duration}"`,
          `"${targetPath}"`,
        ],
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

  return { convertFile, cutVideo };
};

export { useFfmpegRepository };
