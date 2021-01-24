import type { Settings } from '../../sketchApi'

export type SettingsState =
	& Settings
	& {
		showSettingsModal: boolean
	}

export const initialSettingsState: SettingsState = {
	showSettingsModal: false,
	defaultSaveDirectory: '',
	skipImportSummary: false,
}
