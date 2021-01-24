import type { Settings } from '../../sketchApi'

export const SET_SHOW_SETTINGS_MODAL = 'SET_SHOW_SETTINGS_MODAL'
export type SetShowSettingsModalAction = {
    type: typeof SET_SHOW_SETTINGS_MODAL
    payload: boolean
}
export const setShowSettingsModal = (show: SetShowSettingsModalAction['payload']): SetShowSettingsModalAction => ({
	type: SET_SHOW_SETTINGS_MODAL,
	payload: show,
})

export const SET_SETTINGS = 'SET_SETTINGS'
export type SetSettingsAction = {
    type: typeof SET_SETTINGS
    payload: Settings
}
export const setSettings = (settings: SetSettingsAction['payload']): SetSettingsAction => ({
	type: SET_SETTINGS,
	payload: settings,
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

export const SET_SKIP_IMPORT_SUMMARY = 'SET_SKIP_IMPORT_SUMMARY'
export type SetSkipImportSummaryAction = {
    type: typeof SET_SKIP_IMPORT_SUMMARY
    payload: boolean
}
export const setSkipImportSummary = (skip: SetSkipImportSummaryAction['payload']): SetSkipImportSummaryAction => ({
	type: SET_SKIP_IMPORT_SUMMARY,
	payload: skip,
})

export type SettingsActionType =
    | SetShowSettingsModalAction
    | SetSettingsAction
    | SetDefaultSaveDirectoryAction
    | SetSkipImportSummaryAction
