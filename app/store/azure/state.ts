import type { AzureCredentials } from '../../sketchApi'

export type AzureModalState = 'standard' | 'redirectToRepos' | null

export type AzureState = {
	azureModalState: AzureModalState
	showReposModal: boolean
	credentials: AzureCredentials
	localProject: string
	branchName: string
	lastPush: Date | null
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
	lastPush: null,
	online: false,
}
