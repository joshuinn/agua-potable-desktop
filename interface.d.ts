export interface IElectronAPI {
  sendMessage: () => Promise<void>;
  closeApp: () => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
