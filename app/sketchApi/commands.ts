import type { SketchCommand } from './types'
import type { ThemeData } from '../store'
import type {
	RecentProject,
	AzureCredentials,
} from './sketchTypes'

export type SketchCommands = {
    getRecentProjects: SketchCommand<{}, RecentProject[]>
    loginToAzure: SketchCommand<AzureCredentials, true>
    openBrowserWindow: SketchCommand<{ url: string }, true>
    selectLocalProject: SketchCommand<RecentProject | {}, { themeData: ThemeData, selectedProjectDirectory: string, recentProjects: RecentProject[] }>
}
