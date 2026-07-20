import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { CatStateManager } from './utils/stateManager';

let mainWindow: BrowserWindow | null = null;
const stateManager = new CatStateManager();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../assets/icon.png'),
  });

  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC handlers
ipcMain.handle('get-cat-state', async () => {
  return stateManager.getState();
});

ipcMain.handle('update-cat-state', async (_, newState) => {
  stateManager.setState(newState);
  return stateManager.getState();
});

ipcMain.handle('feed-cat', async () => {
  return stateManager.feedCat();
});

ipcMain.handle('play-with-cat', async () => {
  return stateManager.playCat();
});

ipcMain.handle('sleep-cat', async () => {
  return stateManager.sleepCat();
});

ipcMain.handle('groom-cat', async () => {
  return stateManager.groomCat();
});
