import { produce } from 'immer'
import {
	SET_SHOW_SETTINGS_MODAL,
	SET_DEFAULT_SAVE_DIRECTORY,
} from './actions'
import { initialSettingsState } from './state'
import type { SettingsActionType } from './actions'
import type { SettingsState } from './state'

export const settingsReducer = (
	state: SettingsState = initialSettingsState,
	action: SettingsActionType,
): SettingsState => {
	return produce(state, (nextState) => {
		switch (action.type) {
			case SET_SHOW_SETTINGS_MODAL: {
				nextState.showSettingsModal = action.payload
				break
			}

			case SET_DEFAULT_SAVE_DIRECTORY: {
				nextState.defaultSaveDirectory = action.payload
				break
			}

			default: {
				break
			}
		}
	})
}
