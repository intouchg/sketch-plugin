export const SET_SHOW_SETTINGS_MODAL = 'SET_SHOW_SETTINGS_MODAL'
export type SetShowSettingsModalAction = {
    type: typeof SET_SHOW_SETTINGS_MODAL
    payload: boolean
}
export const setShowSettingsModal = (show: SetShowSettingsModalAction['payload']): SetShowSettingsModalAction => ({
	type: SET_SHOW_SETTINGS_MODAL,
	payload: show,
})

export type SettingsActionType =
    | SetShowSettingsModalAction
