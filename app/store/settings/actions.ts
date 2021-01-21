export const SET_SHOW_SETTINGS_MODAL = 'SET_SHOW_SETTINGS_MODAL'
export type SetShowSettingsModalAction = {
    type: typeof SET_SHOW_SETTINGS_MODAL
    payload: boolean
}
export const setShowSettingsModal = (show: SetShowSettingsModalAction['payload']): SetShowSettingsModalAction => ({
	type: SET_SHOW_SETTINGS_MODAL,
	payload: show,
})

export const SET_DEFAULT_SAVE_DIRECTORY = 'SET_DEFAULT_SAVE_DIRECTORY'
export type SetDefaultSaveDirectoryAction = {
    type: typeof SET_DEFAULT_SAVE_DIRECTORY
    payload: string
}
export const setDefaultSaveDirectory = (filepath: SetDefaultSaveDirectoryAction['payload']): SetDefaultSaveDirectoryAction => ({
	type: SET_DEFAULT_SAVE_DIRECTORY,
	payload: filepath,
})

export type SettingsActionType =
    | SetShowSettingsModalAction
    | SetDefaultSaveDirectoryAction
