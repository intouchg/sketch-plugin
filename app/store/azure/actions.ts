import type { AzureCredentials } from '../../sketchApi'

export const SET_CREDENTIALS = 'SET_CREDENTIALS'
export type SetAzureCredentialsAction = {
    type: typeof SET_CREDENTIALS
    payload: AzureCredentials
}
export const setAzureCredentials = (credentials: SetAzureCredentialsAction['payload']): SetAzureCredentialsAction => ({
	type: SET_CREDENTIALS,
	payload: credentials,
})

export type AzureActionType =
    | SetAzureCredentialsAction
