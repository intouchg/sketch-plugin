import { produce } from 'immer'
import { SET_CREDENTIALS } from './actions'
import { initialAzureState } from './state'
import type { AzureActionType } from './actions'
import type { AzureState } from './state'

export const azureReducer = (
	state: AzureState = initialAzureState,
	action: AzureActionType,
): AzureState => {
	return produce(state, (nextState) => {
		switch (action.type) {
			case SET_CREDENTIALS: {
				nextState.credentials = action.payload
				break
			}

			default: {
				break
			}
		}
	})
}
