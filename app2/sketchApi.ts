import type { ThemeValue, ThemeGroup, ThemeComponent, themeTypePropertyMap } from '@i/theme'
import type { AzureGitRepo } from '@i/azure'

export type ImportedSketchStyles = { [key in typeof themeTypePropertyMap[ThemeValue['type']]]: string[] | number[] }

// These are the functions that exist on the window object
// so that Sketch can call into the webview frontend. You
// can assign callbacks on the window object, using these
// function names as keys:
// window.setThemeData = (data) => console.log(data)
interface WebviewListeners {
    azureRequestError?: (error: { status: number, url: string }) => void
    clonedAzureGitRepo: () => void
    cloningAzureGitRepo: () => void
    displayError?: (message: string) => void
    displaySuccess?: (message: string) => void
    receiveImportedSketchStyles?: (styles: ImportedSketchStyles) => void
    setGitRepos?: (repos: any) => void
    setImportSketchStylesResult?: (result: boolean) => void
    setThemeData?: (data: any) => void
    setSaveThemeDataResult?: (result: boolean) => void
    showStorybookLoading?: (show: boolean) => void
    storybookLoadingProgress?: (progress: number) => void
}

declare global {
	interface Window extends WebviewListeners {}
}

export type WebviewListenerType = keyof WebviewListeners

// These are the functions that exist in Sketch so
// that the webview can call into Sketch. Each function
// is expected to have 0 or 1 parameters. The function
// names can be used as window.postMessage types to
// call into the Sketch backend:
// window.postMessage('selectGitRepo')
interface SketchListeners {
    cloneAzureGitRepo: (gitRepo: AzureGitRepo) => void
    extractSketchDocumentStyles: () => void
    getAzureGitRepos: (credentials: { username: string, accessToken: string }) => void
    openStorybook: () => void
    saveThemeData: (data: {
        values: ThemeValue[]
        groups: ThemeGroup[]
        components: ThemeComponent[]
    }) => void
    selectGitRepo: () => void
    startAuthServer: () => void
}

export type SketchListenerType = keyof SketchListeners

export const sketchRequest = <T extends SketchListenerType>(type: T, payload?: Parameters<SketchListeners[T]>[0]) => window.postMessage(type, payload as any)
