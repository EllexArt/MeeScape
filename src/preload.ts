import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ping: () => console.log('✅ Preload chargé'),

  // Exemple d'appel IPC vers le process principal
  send: (channel: string, data?: any) => {
    ipcRenderer.send(channel, data);
  },

  // Exemple d'écoute d'un événement depuis le main
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  }
});
