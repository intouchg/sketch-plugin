import type { Resolve } from './types'
import type { SketchCommands } from './commands'

export * from './sketchTypes'
export * from './commands'
export * from './index-old'
export * from './hooks'

const sketchCommands: Record<number, { resolve: Resolve<any>, reject: (error: string) => void}> = {}
let commandId = 0

// Sends a message from the React webview front end to the Sketch plugin back end
export const sendSketchCommand = <K extends keyof SketchCommands>(type: K, payload: SketchCommands[K]['payload']): Promise<SketchCommands[K]['response']> => {
	return new Promise((resolve, reject) => {
		sketchCommands[commandId] = { resolve, reject }
		window.postMessage('clientCommand', JSON.stringify({ commandId, type, payload }))
		commandId++
	})
}

// Resolves a message sent from the React webview front end to the Sketch plugin back end
window.resolveCommand = ({ commandId, result }) => {
	result = result || {}
	const isError = result.hasOwnProperty('error')
	sketchCommands[commandId][isError ? 'reject' : 'resolve'](isError ? result.error : result)
}

export const openBrowserWindow = async (url: string) => sendSketchCommand('openBrowserWindow', { url })
