import type { ThemeData } from '../../store'
import type { DirectoryFilepath } from './metadata'

export type ProjectData = {
    themeData: ThemeData
    selectedProjectDirectory: string
    branchName: string
    hasLocalChanges: boolean
    lastPushTime: string
    recentProjects: DirectoryFilepath[]
}
