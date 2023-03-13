/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import * as fs from 'fs';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

/**
 * Will return list of movies in provided directory (will skip directories
 * and other types of file)
 * @param dir directory to read from
 * @returns list of movie files
 */
export function getVideoFilesInDir(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((file) =>
      ['mp4', 'mov', 'avi', 'mkv', 'wmv'].includes(file.split('.').pop() || '')
    );
}
