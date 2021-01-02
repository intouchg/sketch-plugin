import type { SketchCommand } from './types'
import type { ThemeData } from '../store'
import type {
	RecentProject,
	AzureCredentials,
	SPFontData,
} from './sketchTypes'

export type SketchCommands = {
    getAzureCredentials: SketchCommand<{}, AzureCredentials>
    getRecentProjects: SketchCommand<{}, RecentProject[]>
    getSketchDocumentNames: SketchCommand<{}, string[]>
    getSystemFonts: SketchCommand<{}, SPFontData>
    loginToAzure: SketchCommand<AzureCredentials, true>
    openBrowserWindow: SketchCommand<{ url: string }, true>
    selectLocalProject: SketchCommand<RecentProject | {}, { themeData: ThemeData, selectedProjectDirectory: string, recentProjects: RecentProject[] }>
    selectNewProjectDirectory: SketchCommand<{}, string>
}
