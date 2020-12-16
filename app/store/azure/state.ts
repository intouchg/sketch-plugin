import type { AzureCredentials } from '../../sketchApi'

export type AzureState = {
    credentials: AzureCredentials
}

export const initialAzureState: AzureState = {
	credentials: {
		username: '',
		accessToken: '',
	},
}
