import type { ThemeData } from '../store'
import type {
	ProjectData,
	DirectoryFilepath,
	AzureCredentials,
	RawImportedSketchValues,
	SPFontData,
} from './types'
import type { AzureUserConnection } from '@i/azure'

export type SketchCommand<P extends object, R> = { payload: P, response: R }
export type SketchError = { error: string }

export type SketchCommands = {
    checkHasRemoteChanges: SketchCommand<{}, boolean>
    cloneAzureGitRepo: SketchCommand<DirectoryFilepath & { remoteUrl: string, repoName: string, branchName: string }, string>
    closeLocalProject: SketchCommand<{}, true>
    downloadRemoteChanges: SketchCommand<{}, { didReceiveChanges: boolean, hasMergeConflict: boolean, themeData: ThemeData }>
    extractSketchDocumentStyles: SketchCommand<{ sketchDocumentIndex: number }, RawImportedSketchValues>
    forgetAzureCredentials: SketchCommand<{}, true>
    getAzureCredentials: SketchCommand<{}, AzureCredentials>
    getAzureGitRepos: SketchCommand<{}, AzureUserConnection['gitRepos']>
    getDefaultSaveDirectory: SketchCommand<{}, string>
    getRecentProjects: SketchCommand<{}, DirectoryFilepath[]>
    getSketchDocumentNames: SketchCommand<{}, string[]>
    getSystemFonts: SketchCommand<{}, SPFontData>
    installDependencies: SketchCommand<DirectoryFilepath, true>
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
