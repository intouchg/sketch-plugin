import type { AzureCredentials } from '../../sketchApi'
import type { AzureModalState } from './state'

export const RESET_PROJECT_STATE = 'RESET_PROJECT_STATE'
export type ResetProjectStateAction = {
    type: typeof RESET_PROJECT_STATE
    payload: undefined
}
export const resetProjectState = (): ResetProjectStateAction => ({
	type: RESET_PROJECT_STATE,
	payload: undefined,
})

export const SET_AZURE_MODAL_STATE = 'SET_AZURE_MODAL_STATE'
export type SetAzureModalStateAction = {
    type: typeof SET_AZURE_MODAL_STATE
    payload: AzureModalState
}
export const setAzureModalState = (azureModalState: SetAzureModalStateAction['payload']): SetAzureModalStateAction => ({
	type: SET_AZURE_MODAL_STATE,
	payload: azureModalState,
})

export const SET_SHOW_REPOS_MODAL = 'SET_SHOW_REPOS_MODAL'
export type SetShowReposModalAction = {
    type: typeof SET_SHOW_REPOS_MODAL
    payload: boolean
}
export const setShowReposModal = (show: SetShowReposModalAction['payload']): SetShowReposModalAction => ({
	type: SET_SHOW_REPOS_MODAL,
	payload: show,
})

export const SET_AZURE_CREDENTIALS = 'SET_CREDENTIALS'
export type SetAzureCredentialsAction = {
    type: typeof SET_AZURE_CREDENTIALS
    payload: AzureCredentials
}
export const setAzureCredentials = (credentials: SetAzureCredentialsAction['payload']): SetAzureCredentialsAction => ({
	type: SET_AZURE_CREDENTIALS,
	payload: credentials,
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

export const SET_HAS_LOCAL_CHANGES = 'SET_HAS_LOCAL_CHANGES'
export type SetHasLocalChangesAction = {
    type: typeof SET_HAS_LOCAL_CHANGES
    payload: boolean
}
export const setHasLocalChanges = (hasLocalChanges: SetHasLocalChangesAction['payload']): SetHasLocalChangesAction => ({
	type: SET_HAS_LOCAL_CHANGES,
	payload: hasLocalChanges,
})

export const SET_HAS_REMOTE_CHANGES = 'SET_HAS_REMOTE_CHANGES'
export type SetHasRemoteChangesAction = {
    type: typeof SET_HAS_REMOTE_CHANGES
    payload: boolean
}
export const setHasRemoteChanges = (hasRemoteChanges: SetHasRemoteChangesAction['payload']): SetHasRemoteChangesAction => ({
	type: SET_HAS_REMOTE_CHANGES,
	payload: hasRemoteChanges,
})

export const SET_CHECKING_HAS_REMOTE_CHANGES = 'SET_CHECKING_HAS_REMOTE_CHANGES'
export type SetCheckingHasRemoteChangesAction = {
    type: typeof SET_CHECKING_HAS_REMOTE_CHANGES
    payload: boolean
}
export const setCheckingHasRemoteChanges = (isChecking: SetCheckingHasRemoteChangesAction['payload']): SetCheckingHasRemoteChangesAction => ({
	type: SET_CHECKING_HAS_REMOTE_CHANGES,
	payload: isChecking,
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
    | ResetProjectStateAction
    | SetAzureModalStateAction
    | SetShowReposModalAction
    | SetAzureCredentialsAction
    | ForgetAzureCredentialsAction
    | SetLocalProjectAction
    | SetBranchNameAction
    | SetHasLocalChangesAction
    | SetHasRemoteChangesAction
    | SetCheckingHasRemoteChangesAction
    | SetOnlineStatusAction
