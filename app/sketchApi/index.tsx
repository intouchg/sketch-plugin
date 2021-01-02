import type { Resolve } from './types'
import type { SketchCommands } from './commands'

export * from './sketchTypes'
export * from './commands'
export * from './index-old'
export * from './hooks'

/*
	This message system promisifies commands sent from this React webview frontend to
	the Sketch plugin backend.
*/

const sketchCommands: Record<number, { resolve: Resolve<any>, reject: (error: string) => void}> = {}
let commandId = 0

export const sendSketchCommand2 = <K extends keyof SketchCommands>(type: K, payload: SketchCommands[K]['payload']): Promise<SketchCommands[K]['response']> => {
	return new Promise((resolve, reject) => {
		sketchCommands[commandId] = { resolve, reject }
		window.postMessage('clientCommand', JSON.stringify({ commandId, type, payload }))
		commandId++
	})
}

window.resolveCommand = ({ commandId, result }) => {
	const isError = typeof result === 'object' && result.hasOwnProperty('error')
	sketchCommands[commandId][isError ? 'reject' : 'resolve'](isError ? result.error : result)
}

export const openBrowserWindow = async (url: string) => sendSketchCommand2('openBrowserWindow', { url })
