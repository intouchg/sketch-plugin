import type { ThemeData } from '../store'
import type {
	ProjectData,
	DirectoryFilepath,
	AzureCredentials,
	RawImportedSketchValues,
	SPFontData,
	Settings,
} from './types'
import type { AzureUserConnection } from '@intouchg/azure'

export type SketchCommand<P extends object, R> = { payload: P, response: R }
export type SketchError = { error: string }

export type SketchCommands = {
    checkHasRemoteChanges: SketchCommand<{}, boolean>
    cloneAzureGitRepo: SketchCommand<DirectoryFilepath & { remoteUrl: string, repoName: string, branchName: string }, string>
    closeLocalProject: SketchCommand<{}, true>
    downloadRemoteChanges: SketchCommand<{}, { didReceiveChanges: boolean, hasMergeConflict: boolean, themeData: ThemeData }>
    extractSketchDocumentStyles: SketchCommand<{ sketchDocumentIndex: number }, RawImportedSketchValues>
    forgetAzureCredentials: SketchCommand<{}, true>
    getAzureCredentials: SketchCommand<{ online: boolean }, AzureCredentials>
    getAzureGitRepos: SketchCommand<{}, AzureUserConnection['gitRepos']>
    getLocalSettings: SketchCommand<{}, Settings>
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
    updateLocalSettings: SketchCommand<Partial<Settings>, true>
}

export type ClientCommands = {
    setSketchDocumentNames: string[]
}
