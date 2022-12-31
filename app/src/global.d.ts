declare module '*.svg'
declare module '*.png'
declare module '*.jpeg'

declare global {
	interface Window {
		electron: {
			nativeCall(functionName: string, args: any): void,
			signalClose(): void,
			getProfile(): unknown,
			logOut(): void,
			getPrivateData(): unknown,
		},
	}
}

export { }