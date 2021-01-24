import { produce } from 'immer'
import {
	SET_SHOW_SETTINGS_MODAL,
	SET_SETTINGS,
	SET_DEFAULT_SAVE_DIRECTORY,
	SET_SKIP_IMPORT_SUMMARY,
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

			case SET_SETTINGS: {
				const { defaultSaveDirectory, skipImportSummary } = action.payload
				nextState.defaultSaveDirectory = defaultSaveDirectory
				nextState.skipImportSummary = skipImportSummary
				break
			}

			case SET_DEFAULT_SAVE_DIRECTORY: {
				nextState.defaultSaveDirectory = action.payload
				break
			}

			case SET_SKIP_IMPORT_SUMMARY: {
				nextState.skipImportSummary = action.payload
				break
			}

			default: {
				break
			}
		}
	})
}
