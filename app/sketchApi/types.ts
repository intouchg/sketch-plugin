export type Resolve<T> = (value?: T | PromiseLike<T>) => void
export type SketchCommand<P extends object, R> = { payload: P, response: R }
export type SketchError = { error: string }

interface WebviewWindowProperties {
    // window.sketchCommand listens for commands sent from the Sketch back end to the webview front end
    sketchCommand: (command: { commandId: number, type: string, payload: any }) => void

    // window.resolveCommand resolves commands send from the webview front end to the Sketch back end
    resolveCommand: (response: { commandId: number, result: any }) => void
}

declare global {
	interface Window extends WebviewWindowProperties {}
}
