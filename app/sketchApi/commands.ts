import type { SketchCommand } from './types'
import type { ThemeData } from '../store'
import type {
	RawImportedSketchValues,
	AzureCredentials,
	RecentProject,
	SPFontData,
} from './sketchTypes'

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
    selectLocalProject: SketchCommand<RecentProject | {}, { themeData: ThemeData, selectedProjectDirectory: string, recentProjects: RecentProject[] }>
    selectNewProjectDirectory: SketchCommand<{}, string>
}

export type ClientCommands = {
    setSketchDocumentNames: string[]
}
