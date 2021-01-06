import type { AzureCredentials } from '../../sketchApi'

export const SET_AZURE_CREDENTIALS = 'SET_CREDENTIALS'
export type SetAzureCredentialsAction = {
    type: typeof SET_AZURE_CREDENTIALS
    payload: AzureCredentials
}
export const setAzureCredentials = (credentials: SetAzureCredentialsAction['payload']): SetAzureCredentialsAction => ({
	type: SET_AZURE_CREDENTIALS,
	payload: credentials,
})

export const SET_LOCAL_PROJECT = 'SET_LOCAL_PROJECT'
export type SetLocalProjectAction = {
    type: typeof SET_LOCAL_PROJECT
    payload: string
}
export const setLocalProject = (filepath: SetLocalProjectAction['payload']): SetLocalProjectAction => ({
	type: SET_LOCAL_PROJECT,
	payload: filepath,
})

export const SET_BRANCH_NAME = 'SET_BRANCH_NAME'
export type SetBranchNameAction = {
    type: typeof SET_BRANCH_NAME
    payload: string
}
export const setBranchName = (branchName: SetBranchNameAction['payload']): SetBranchNameAction => ({
	type: SET_BRANCH_NAME,
	payload: branchName,
})

export const FORGET_AZURE_CREDENTIALS = 'FORGET_AZURE_CREDENTIALS'
export type ForgetAzureCredentialsAction = {
    type: typeof FORGET_AZURE_CREDENTIALS
    payload: undefined
}
export const forgetAzureCredentials = (): ForgetAzureCredentialsAction => ({
	type: FORGET_AZURE_CREDENTIALS,
	payload: undefined,
})

export const SET_ONLINE_STATUS = 'SET_ONLINE_STATUS'
export type SetOnlineStatusAction = {
    type: typeof SET_ONLINE_STATUS
    payload: boolean
}
export const setOnlineStatus = (online: SetOnlineStatusAction['payload']): SetOnlineStatusAction => ({
	type: SET_ONLINE_STATUS,
	payload: online,
})

export type AzureActionType =
    | SetAzureCredentialsAction
    | SetLocalProjectAction
    | SetBranchNameAction
    | ForgetAzureCredentialsAction
    | SetOnlineStatusAction
