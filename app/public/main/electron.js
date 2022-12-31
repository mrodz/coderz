const {
	app,
	BrowserWindow,
	ipcMain
} = require('electron')
// const isDev = require('electron-is-dev')
// const path = require('path')

const bridgeFunctions = require('./bridge-functions')
const { createAuthWindow, createLogoutWindow } = require('./auth-process')
const { createAppWindow, getMainWindow, getSplashWindow } = require('./app-process')
const authService = require('../services/auth-service')
const apiService = require('../services/api-service')

const showWindow = async () => {
	try {
		await authService.refreshTokens()
		console.log('signed in!')
		createAppWindow()
	} catch (err) {
		console.log('need auth')
		createAuthWindow()
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow)
app.on('ready', () => {
	ipcMain.handle('main:remove-splash-screen', () => {
		getSplashWindow().hide()
		getMainWindow().show()
	})

	ipcMain.handle('auth:get-profile', authService.getProfile)
	ipcMain.handle('api:get-private-data', apiService.getPrivateData)
	ipcMain.on('auth:log-out', () => {
		for (const window of BrowserWindow.getAllWindows()) {
			window.close()
		}
		createLogoutWindow()
	})

	for (const bridgeFunction in bridgeFunctions) {
		ipcMain.handle(bridgeFunction, bridgeFunctions[bridgeFunction])
	}

	showWindow()
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
		showWindow()
	}
})