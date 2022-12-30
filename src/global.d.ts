declare module '*.svg'
declare module '*.png'
declare module '*.jpeg'

declare global {
	interface Window {
		electron: readonly {
			nativeCall: (functionName: string, args: any) => void,
			signalClose: () => void
		},
	}
}

export { }