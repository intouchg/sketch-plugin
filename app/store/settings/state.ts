export type SettingsState = {
	showSettingsModal: boolean
	defaultSaveDirectory: string
}

export const initialSettingsState: SettingsState = {
	showSettingsModal: false,
	defaultSaveDirectory: '',
}
