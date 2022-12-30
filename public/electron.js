const {
	app,
	BrowserWindow,
	ipcMain
} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const bridgeFunctions = require('./bridge-functions')

let mainWindow = null
let splashWindow = null

const createWindow = async () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: true,
		// transparent: true,
		// frame: false,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js')
		},
	})

	splashWindow = new BrowserWindow({
		width: 400,
		height: 600,
		show: true,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'splash-preload.js')
		}
	})

	splashWindow.loadFile('./public/splash.html')
	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	)

	ipcMain.handle('remove-splash-screen', () => {
		console.log('showing')
		// console.log(splashWindow, mainWindow)
		splashWindow.hide()
		mainWindow.show()
	})

	// Open the DevTools.
	if (isDev) {
		// win.webContents.openDevTools({ mode: 'detach' })
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow)
app.on('ready', () => {
	for (const bridgeFunction in bridgeFunctions) {
		ipcMain.handle(bridgeFunction, bridgeFunctions[bridgeFunction])
	}

	createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})