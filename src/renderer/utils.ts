import { Channels } from '../main/preload';

export type ElectronMessageHandler = (arg: unknown) => void;

/**
 * This util will send event to electron which will be handled by electron API.
 *
 * @param channels on of existing chanel
 * @param arg args to be used while event is being handled
 */
export const sendElectronMessage = (channels: Channels, arg: unknown[]) => {
  window.electron.ipcRenderer.sendMessage(channels, arg);
};

/**
 * This will add calback action for electron events. Whenever electron sends
 * event from provided channel, callback will be trigered
 * @param channels chanel to listen for
 * @param callback action to be trigered when event appeared
 */
export const onElectronMessage = (
  channels: Channels,
  callback: ElectronMessageHandler
) => {
  window.electron.ipcRenderer.once(channels, callback);
};

export const onElectronMessageTmp = (
  channels: Channels,
  callback: ElectronMessageHandler
) => {
  window.electron.ipcRenderer.on(channels, callback);
};
