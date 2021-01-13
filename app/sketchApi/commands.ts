import type { ThemeData } from '../store'
import type {
	ProjectData,
	DirectoryFilepath,
	AzureCredentials,
	RawImportedSketchValues,
	SPFontData,
	AzureGitRepos,
} from './types'

export type SketchCommand<P extends object, R> = { payload: P, response: R }
export type SketchError = { error: string }

export type SketchCommands = {
    checkHasRemoteChanges: SketchCommand<{}, boolean>
    cloneAzureGitRepo: SketchCommand<DirectoryFilepath, string>
    closeLocalProject: SketchCommand<{}, true>
    downloadRemoteChanges: SketchCommand<{}, { didReceiveChanges: boolean, themeData: ThemeData }>
    extractSketchDocumentStyles: SketchCommand<{ sketchDocumentIndex: number }, RawImportedSketchValues>
    forgetAzureCredentials: SketchCommand<{}, true>
    getAzureCredentials: SketchCommand<{}, AzureCredentials>
    getAzureGitRepos: SketchCommand<{}, AzureGitRepos>
    getRecentProjects: SketchCommand<{}, DirectoryFilepath[]>
    getSketchDocumentNames: SketchCommand<{}, string[]>
    getSystemFonts: SketchCommand<{}, SPFontData>
    loginToAzure: SketchCommand<AzureCredentials, AzureCredentials>
    openBrowserWindow: SketchCommand<{ url: string }, true>
    openDevServer: SketchCommand<{}, true>
    resetLocalChanges: SketchCommand<{}, ThemeData>
    saveThemeData: SketchCommand<ThemeData, true>
    saveChangesToAzure: SketchCommand<{}, { didSaveChanges: boolean, needsToUpdate: boolean, lastPushTime: string }>
    selectLocalProject: SketchCommand<DirectoryFilepath | {}, ProjectData>
    selectDirectory: SketchCommand<{}, string>
}

export type ClientCommands = {
    setSketchDocumentNames: string[]
}
