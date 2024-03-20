import { app, BrowserWindow, globalShortcut } from 'electron';
import path from 'path';
import { createFileRoute, createURLRoute } from 'electron-router-dom';
import { servicesFactory } from '@/infra/servicesFactory'
import 'reflect-metadata'
import { database } from '@/infra/database';
import { User } from '@/domain/User/User';
import { UserRole } from './domain/User/UserRoules';
import { UserService } from './services/UserService';


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'Ordens de Serviço',
    width: 1300,
    height: 650,
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
          .setRegister(3254)
          .setPassword('123456')
          .setRoule(UserRole.LEADER)

        await services.userService.createUser(user)
      }catch{
        null
      }

      mainWindow?.show()
      mainWindow?.maximize()
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
