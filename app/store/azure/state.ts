import type { AzureCredentials } from '../../sketchApi'

export type AzureState = {
	credentials: AzureCredentials
	localProject: string
	branchName: string
	lastPush: Date | null
}

export const initialAzureState: AzureState = {
	credentials: {
		username: '',
		accessToken: '',
	},
	localProject: '',
	branchName: '',
	lastPush: null,
}
