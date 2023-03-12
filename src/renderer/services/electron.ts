import { Channels } from '../../main/preload';

export type ElectronMessageHandler = (arg: unknown) => void;

const useElectronService = () => {
  /**
   * This util will send event to electron which will be handled by electron API.
   *
   * @param channels on of existing chanel
   * @param arg args to be used while event is being handled
   */
  const sendElectronMessage = (channels: Channels, arg: unknown[]) => {
    window.electron.ipcRenderer.sendMessage(channels, arg);
  };

  /**
   * This method will wait for a single event from electron from provided channel
   * @param channels chanell to wait for
   * @returns promise with value provieded by the event
   */
  const waitForElectronMessage = async (channels: Channels) => {
    return new Promise((resolve) =>
      window.electron.ipcRenderer.once(channels, (arg: unknown) => resolve(arg))
    );
  };

  /**
   * This will add calback action for electron events. Whenever electron sends
   * event from provided channel, callback will be trigered
   * @param channels chanel to listen for
   * @param callback action to be trigered when event appeared
   */
  const onElectronMessage = (
    channels: Channels,
    callback: ElectronMessageHandler
  ) => {
    window.electron.ipcRenderer.on(channels, callback);
  };

  return { sendElectronMessage, waitForElectronMessage, onElectronMessage };
};

export { useElectronService };
