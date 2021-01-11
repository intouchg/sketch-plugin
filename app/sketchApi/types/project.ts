import type { ThemeData } from '../../store'
import type { RecentProject } from './metadata'

export type ProjectData = {
    themeData: ThemeData
    selectedProjectDirectory: string
    branchName: string
    hasLocalChanges: boolean
    lastPushTime: string
    recentProjects: RecentProject[]
}
