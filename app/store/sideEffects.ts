import { SAVEABLE_ACTIONS } from './theme'
import { FORGET_AZURE_CREDENTIALS } from './azure'
import { sendSketchCommand } from '../sketchApi'
import { setHasLocalChanges } from './index'
import type { Middleware } from 'redux'
import type { RootState } from './index'

export const sideEffects: Middleware<{}, RootState> = (storeApi) => (next) => async (action) => {
	try {
		const result = next(action)
		const nextState = storeApi.getState()

		switch (action.type) {
			case FORGET_AZURE_CREDENTIALS: {
				sendSketchCommand('forgetAzureCredentials', {}).catch((error) => console.error(error))
				break
			}

			default: {
				break
			}
		}

		if (SAVEABLE_ACTIONS.includes(action.type)) {
			const hasLocalChanges = await sendSketchCommand('saveThemeData', {
				values: Object.values(nextState.theme.values).flat(),
				variants: nextState.theme.variants,
			})

			storeApi.dispatch(setHasLocalChanges(hasLocalChanges))
		}

		return result
	}
	catch (error) {
		console.error(error)
	}
}
