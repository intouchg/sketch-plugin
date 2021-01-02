import type { SketchCommands, ClientCommands } from './commands'

export * from './types'
export * from './commands'
export * from './hooks'

interface WebviewWindowProperties {
    // window.sketchCommand listens for commands sent from the Sketch back end to the webview front end
    sketchCommand: <T extends keyof ClientCommands>(command: { commandId: number, type: T, payload: ClientCommands[T] }) => void
    // window.resolveCommand resolves commands send from the webview front end to the Sketch back end
    resolveCommand: (response: { commandId: number, result: any }) => void
}

declare global {
	interface Window extends WebviewWindowProperties {}
}

type Resolve<T> = (value?: T | PromiseLike<T>) => void

const sketchCommands: Record<number, { resolve: Resolve<any>, reject: (error: string) => void}> = {}
let commandId = 0

// Resolves a message sent from the React webview front end to the Sketch plugin back end
window.resolveCommand = ({ commandId, result }) => {
	result = result || {}
	const isError = result.hasOwnProperty('error')
	sketchCommands[commandId][isError ? 'reject' : 'resolve'](isError ? result.error : result)
}

// Sends a message from the React webview front end to the Sketch plugin back end
export const sendSketchCommand = <K extends keyof SketchCommands>(type: K, payload: SketchCommands[K]['payload']): Promise<SketchCommands[K]['response']> => {
	return new Promise((resolve, reject) => {
		sketchCommands[commandId] = { resolve, reject }
		window.postMessage('clientCommand', JSON.stringify({ commandId, type, payload }))
		commandId++
	})
}

export const openBrowserWindow = async (url: string) => sendSketchCommand('openBrowserWindow', { url })
