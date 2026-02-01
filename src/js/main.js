const { app, BrowserWindow } = require('electron');
const path = require('path');

// Get the directory where this script is located
const scriptDir = path.dirname(__filename);
console.log('Script directory:', scriptDir);

function createWindow() {
    const win = new BrowserWindow({
        width: 750,
        height: 600,
        webPreferences: {
            preload: path.join(scriptDir, 'renderer.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    const htmlPath = path.join(scriptDir, '..', '..', 'frontend', 'index.html');
    console.log('Loading HTML from:', htmlPath);
    win.loadFile(htmlPath);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});