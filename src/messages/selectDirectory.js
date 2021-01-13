import dialog from '@skpm/dialog'

export const selectDirectory = (state, payload) => {
	const selectedDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]
	return selectedDirectory || ''
}
