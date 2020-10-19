import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setThemeData, setRecentProjects, setSketchDocumentNames, setImportedSketchValues, setSystemFonts } from '../store'
import type { ThemeValue, ThemeComponent, ThemeVariant } from '@i/theme'
import type { AzureGitRepo } from '@i/azure'
import type { RawImportedSketchValues } from './styles'
import type { SPFontData } from './fonts'

export * from './fonts'
export * from './styles'

export type RecentProject = { filepath: string }

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
    setGitRepos?: (repos: any) => void
    setImportSketchStylesResult?: (result: boolean) => void
    setImportedSketchValues?: (styles: RawImportedSketchValues) => void
    setThemeData?: (data: any) => void
    setRecentProjects?: (data: RecentProject[]) => void
    setSaveThemeDataResult?: (result: boolean) => void
    setSketchDocumentNames?: (sketchDocumentNames: string[]) => void
    setSystemFonts?: (fonts: SPFontData) => void
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
// window.postMessage('selectLocalProject')
interface SketchListeners {
    cloneAzureGitRepo: (gitRepo: AzureGitRepo) => void
    extractSketchDocumentStyles: (sketchDocumentIndex: number) => void
    getAzureGitRepos: (credentials: { username: string, accessToken: string }) => void
    getRecentProjects: () => RecentProject[]
    getSketchDocumentNames: () => string[]
    getSystemFonts: () => SPFontData
    openStorybook: () => void
    saveThemeData: (data: {
        values: ThemeValue[]
        components: ThemeComponent[]
        variants: ThemeVariant[]
    }) => void
    selectLocalProject: (recentProject?: RecentProject) => void
    startAuthServer: () => void
}

export type SketchListenerType = keyof SketchListeners

export const sketchRequest = <T extends SketchListenerType>(type: T, payload?: Parameters<SketchListeners[T]>[0]) => window.postMessage(type, payload as any)

export const useGlobalSketchListeners = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		window.setThemeData = (themeData) => dispatch(setThemeData(themeData)) && history.push('/main')
		window.setRecentProjects = (recentProjects) => dispatch(setRecentProjects(recentProjects))
		window.setSketchDocumentNames = (sketchDocumentNames) => dispatch(setSketchDocumentNames(sketchDocumentNames))
		window.setImportedSketchValues = (styles) => dispatch(setImportedSketchValues(styles))
		window.setSystemFonts = (fonts) => dispatch(setSystemFonts(fonts))

		sketchRequest('getSketchDocumentNames')
		sketchRequest('getSystemFonts')

		return () => {
			delete window.setThemeData
			delete window.setRecentProjects
			delete window.setSketchDocumentNames
			delete window.setImportedSketchValues
			delete window.setSystemFonts
		}
	}, [ history, dispatch ])
}
