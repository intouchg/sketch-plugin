import { produce } from 'immer'
import {
	SET_SHOW_SETTINGS_MODAL,
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

			default: {
				break
			}
		}
	})
}
