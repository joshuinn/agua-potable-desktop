console.log("Preload.js cargado correctamente.");

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (message: string) => ipcRenderer.send("message", message),
  closeApp: () => ipcRenderer.send("close-app"),
});
export interface IElectronAPI {
  sendMessage: () => Promise<void>;
  closeApp: () => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

console.log("API de Electron expuesta correctamente.", window?.electronAPI); 
