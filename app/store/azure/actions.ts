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

export const RESET_AZURE_STATE = 'RESET_AZURE_STATE'
export type ResetAzureStateAction = {
    type: typeof RESET_AZURE_STATE
    payload: undefined
}
export const resetAzureState = (): ResetAzureStateAction => ({
	type: RESET_AZURE_STATE,
	payload: undefined,
})

export type AzureActionType =
    | SetAzureCredentialsAction
    | SetLocalProjectAction
    | SetBranchNameAction
    | ResetAzureStateAction
