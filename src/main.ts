import { app, BrowserWindow, globalShortcut } from 'electron';
import path from 'path';
import { createFileRoute, createURLRoute } from 'electron-router-dom';
import { servicesFactory } from '@/infra/servicesFactory'
import 'reflect-metadata'
import { database } from '@/infra/database';
import { User } from '@/domain/User/User';
import { UserRole } from './domain/User/UserRoules';


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Ordens de Serviço',
    width: 900,
    height: 600,
    minHeight: 600,
    minWidth: 900,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const id = 'main'

  const devServerURL = createURLRoute(MAIN_WINDOW_VITE_DEV_SERVER_URL, id)

  const fileRoute = createFileRoute(
    path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    id
  )

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(devServerURL);
  } else {
    app.on('browser-window-focus', () => {
      globalShortcut.register('CommandOrControl+R', () => null)
      globalShortcut.register('F5', () => null)
    })
    mainWindow.loadFile(...fileRoute);
  }

  mainWindow.setMenuBarVisibility(false)

  mainWindow.once('ready-to-show', async () => {
      await database.initialize()
      const services = servicesFactory()

      try{
        const user = new User()
          .setFirstName('Leandro')
          .setLastName('Santino')
          .setRegister(913)
          .setPassword('123456789')
          .setRoule(UserRole.LEADER)

        await services.userService.create(user)
      }catch{
        null
      }

      mainWindow?.show()
      mainWindow?.maximize()
  });

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

