const { BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow = null
let splashWindow = null

const getMainWindow = () => mainWindow
const getSplashWindow = () => splashWindow

async function createAppWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: true,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js')
		},
	})

	splashWindow = new BrowserWindow({
		width: 200,
		height: 300,
		show: true,
		frame: false,
		alwaysOnTop: true,
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'splash-preload.js')
		}
	})

	// closing the main window should close all other windows, too.
	mainWindow.on('close', () => {
		splashWindow?.close?.()
	})

	splashWindow.loadFile('./public/splash.html')
	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	)

	// Open the DevTools.
	// if (isDev) {
	// 	win.webContents.openDevTools({ mode: 'detach' })
	// }
}

module.exports = {
	createAppWindow,
	getMainWindow,
	getSplashWindow
}