import type { AzureGitRepo } from '@i/azure'
import type { ThemeData } from '../store'
import type { Message, RecentProject, AzureCredentials, RawImportedSketchValues, SPFontData } from './sketchTypes'

// These are the functions that exist on the window object
// so that Sketch can call into the webview frontend. You
// can assign callbacks on the window object, using these
// function names as keys:
// window.setThemeData = (data) => console.log(data)
interface WebviewListeners {
    clonedAzureGitRepo: () => void
    cloningAzureGitRepo: () => void
    displayMessage?: (messageData: Message) => void
    handleAzureLoginResult?: (success: boolean) => void
    setBranchName?: (branchName: string) => void
    setGitRepos?: (repos: any) => void
    setImportSketchStylesResult?: (result: boolean) => void
    setImportedSketchValues?: (styles: RawImportedSketchValues) => void
    setLocalProject?: (filepath: string) => void
    setThemeData?: (data: any) => void
    setRecentProjects?: (data: RecentProject[]) => void
    setAzureCredentials?: (credentials: AzureCredentials) => void
    setSketchDocumentNames?: (sketchDocumentNames: string[]) => void
    setSystemFonts?: (fonts: SPFontData) => void
    setNewProjectDirectory?: (directory: string) => void
    showStorybookLoading?: (show: boolean) => void
    storybookLoadingProgress?: (progress: number) => void
}

// These are the functions that exist in Sketch so
// that the webview can call into Sketch. Each function
// is expected to have 0 or 1 parameters. The function
// names can be used as window.postMessage types to
// call into the Sketch backend:
// window.postMessage('openDevServer')
interface SketchListeners {
    cloneAzureGitRepo: (gitRepo: AzureGitRepo) => void
    extractSketchDocumentStyles: (sketchDocumentIndex: number) => void
    forgetAzureCredentials: () => void
    getAzureCredentials: () => AzureCredentials
    getAzureGitRepos: (credentials: AzureCredentials) => void
    getRecentProjects: () => RecentProject[]
    getSketchDocumentNames: () => string[]
    getSystemFonts: () => SPFontData
    loginToAzure: (credentials: AzureCredentials) => void
    openBrowserWindow: (url: string) => void
    openDevServer: () => void
    openStorybook: () => void
    saveThemeData: (themeData: ThemeData) => void
    selectLocalProject: (recentProject?: RecentProject) => void
    selectNewProjectDirectory: () => void
}
