const { contextBridge, ipcRenderer } = require('electron')

process.once('loaded', () => {
	contextBridge.exposeInMainWorld('electron', {
		nativeCall: (functionName, ...args) => ipcRenderer.invoke(functionName, ...args),
		signalClose: () => ipcRenderer.invoke('main:remove-splash-screen'),
		getProfile: () => ipcRenderer.invoke('auth:get-profile'),
		logOut: () => ipcRenderer.send('auth:log-out'),
		getPrivateData: () => ipcRenderer.invoke('api:get-private-data'),
	})
	contextBridge.exposeInMainWorld('versions', {
		node: () => process.versions.node,
		chrome: () => process.versions.chrome,
		electron: () => process.versions.electron,
	})
})