import { BrowserWindow, dialog, ipcMain } from 'electron';

import * as path from 'path';
import { useFfmpegRepository } from './ffmpeg';
import { getVideoFilesInDir } from './util';

type VideoFile = {
  name: string;
  path: string;
  url: string;
};

type ConvertDTO = {
  path: string;
  target: 'mp4' | 'mov';
};

const useEvents = (mainWindow: BrowserWindow | null) => {
  const { convertFile } = useFfmpegRepository();

  ipcMain.on('directory-picker', async (event, args) => {
    if (mainWindow) {
      const directory = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
      });
      event.reply('directory-picker', directory.filePaths[0]);
    }
  });

  ipcMain.on('list-files', async (event, args) => {
    const vault = args[0];
    if (typeof vault === 'string') {
      const files: VideoFile[] = getVideoFilesInDir(vault).map((file) => ({
        name: file,
        path: `${path.join(vault, file)}`,
        url: `file://${path.join(vault, file)}`,
      }));
      event.reply('list-files', files);
    }
  });

  ipcMain.on('format-video', async (event, args) => {
    const dto = args[0];
    if (
      dto &&
      typeof dto.path === 'string' &&
      (dto.target === 'mp4' || dto.target === 'mov')
    ) {
      await convertFile(dto.path, dto.target, event);
      event.reply('format-video', null);
    }
  });

  ipcMain.on('window-close', async (event, args) => {
    mainWindow?.close();
  });

  ipcMain.on('window-max', async (event, args) => {
    mainWindow?.isMaximized()
      ? mainWindow.unmaximize()
      : mainWindow?.maximize();
  });

  ipcMain.on('window-min', async (event, args) => {
    mainWindow?.minimize();
  });

  // ipcMain.on(FORMAT_VIDEO, async (event, args) => {
  //   //     mkdir -p originals
  //   // FILE_NAME=$(echo "$1" | cut -f 1 -d '.')
  //   // ffmpeg -ss "$2" -i $1 -c copy -t "$3" $FILE_NAME-cuted.mp4
  //   // mv ./$1 ./originals/$1
  // });
};

export { useEvents, VideoFile, ConvertDTO };
