import type { AzureCredentials } from '../../sketchApi'

export type AzureModalState = 'standard' | 'redirectToRepos' | null

export type AzureState = {
	azureModalState: AzureModalState
	showReposModal: boolean
	credentials: AzureCredentials
	localProject: string
	branchName: string
	hasLocalChanges: boolean
	hasRemoteChanges: boolean
	checkingHasRemoteChanges: boolean
	lastPushTime: Date | null
	online: boolean
}

export const initialAzureState: AzureState = {
	azureModalState: null,
	showReposModal: false,
	credentials: {
		username: '',
		accessToken: '',
	},
	localProject: '',
	branchName: '',
	hasLocalChanges: false,
	hasRemoteChanges: false,
	checkingHasRemoteChanges: false,
	lastPushTime: null,
	online: false,
}
