import type { LoadingState } from './state'

export const SET_LOADING_STATE = 'SET_LOADING_STATE'
export type SetLoadingStateStateAction = {
    type: typeof SET_LOADING_STATE
    payload: LoadingState
}
export const setLoadingState = (loadingState: SetLoadingStateStateAction['payload']): SetLoadingStateStateAction => ({
	type: SET_LOADING_STATE,
	payload: loadingState,
})

export type LoadingActionType =
    | SetLoadingStateStateAction
