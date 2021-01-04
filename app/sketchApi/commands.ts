import type { ThemeData } from '../store'
import type {
	RawImportedSketchValues,
	AzureCredentials,
	RecentProject,
	SPFontData,
} from './types'

export type SketchCommand<P extends object, R> = { payload: P, response: R }
export type SketchError = { error: string }

export type SketchCommands = {
    extractSketchDocumentStyles: SketchCommand<{ sketchDocumentIndex: number }, RawImportedSketchValues>
    forgetAzureCredentials: SketchCommand<{}, true>
    getAzureCredentials: SketchCommand<{}, AzureCredentials>
    getRecentProjects: SketchCommand<{}, RecentProject[]>
    getSketchDocumentNames: SketchCommand<{}, string[]>
    getSystemFonts: SketchCommand<{}, SPFontData>
    loginToAzure: SketchCommand<AzureCredentials, AzureCredentials>
    openBrowserWindow: SketchCommand<{ url: string }, true>
    openDevServer: SketchCommand<{}, true>
    saveThemeData: SketchCommand<ThemeData, true>
    selectLocalProject: SketchCommand<RecentProject | {}, { themeData: ThemeData, selectedProjectDirectory: string, branchName: string, recentProjects: RecentProject[] }>
    selectNewProjectDirectory: SketchCommand<{}, string>
}

export type ClientCommands = {
    setSketchDocumentNames: string[]
}