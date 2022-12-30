const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
	nativeCall: (functionName, ...args) => ipcRenderer.invoke(functionName, ...args),
	signalClose: () => ipcRenderer.invoke('remove-splash-screen'),
})

contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
})