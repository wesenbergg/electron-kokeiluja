const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    titleBarStyle: 'hidden',
  })

  ipcMain.on("minimize", (evt, arg) => {
   win.minimize();
  });

  ipcMain.on("maximize", (evt, arg) => {
    win.isMaximized() ? win.restore(): win.maximize();
   });

  ipcMain.on("close", (evt, arg) => {
    app.quit();
  });

  ipcMain.on("example", (evt, arg) => {
    console.log("Hello");
  });

  // and load the index.html of the app.
  win.loadURL(
    isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`
);
}

app.whenReady().then(createWindow)