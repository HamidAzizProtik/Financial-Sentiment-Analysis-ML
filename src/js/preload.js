// preload script for electron
// this exposes safe apis to the renderer process

const { contextBridge, ipcRenderer } = require('electron');

// expose protected methods that allow the renderer process to use
// the apis safely
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  version: process.versions.electron
});
