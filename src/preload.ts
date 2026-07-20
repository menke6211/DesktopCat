import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getCatState: () => ipcRenderer.invoke('get-cat-state'),
  updateCatState: (state: any) => ipcRenderer.invoke('update-cat-state', state),
  feedCat: () => ipcRenderer.invoke('feed-cat'),
  playCat: () => ipcRenderer.invoke('play-with-cat'),
  sleepCat: () => ipcRenderer.invoke('sleep-cat'),
});
