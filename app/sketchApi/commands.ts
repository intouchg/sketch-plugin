import type { ThemeData } from '../store'
import type {
	ProjectData,
	RecentProject,
	AzureCredentials,
	RawImportedSketchValues,
	SPFontData,
} from './types'
import type { AzureGitRepo } from '@i/azure'

export type SketchCommand<P extends object, R> = { payload: P, response: R }
export type SketchError = { error: string }

export type SketchCommands = {
    checkHasRemoteChanges: SketchCommand<{}, boolean>
    closeLocalProject: SketchCommand<{}, true>
    downloadRemoteChanges: SketchCommand<{}, boolean>
    extractSketchDocumentStyles: SketchCommand<{ sketchDocumentIndex: number }, RawImportedSketchValues>
    forgetAzureCredentials: SketchCommand<{}, true>
    getAzureCredentials: SketchCommand<{}, AzureCredentials>
    getAzureGitRepos: SketchCommand<{}, AzureGitRepo[]>
    getRecentProjects: SketchCommand<{}, RecentProject[]>
    getSketchDocumentNames: SketchCommand<{}, string[]>
    getSystemFonts: SketchCommand<{}, SPFontData>
    loginToAzure: SketchCommand<AzureCredentials, AzureCredentials>
    openBrowserWindow: SketchCommand<{ url: string }, true>
    openDevServer: SketchCommand<{}, true>
    resetLocalChanges: SketchCommand<{}, ThemeData>
    saveThemeData: SketchCommand<ThemeData, true>
    saveChangesToAzure: SketchCommand<{}, true>
    selectLocalProject: SketchCommand<RecentProject | {}, ProjectData>
    selectNewProjectDirectory: SketchCommand<{}, string>
}

export type ClientCommands = {
    setSketchDocumentNames: string[]
}
