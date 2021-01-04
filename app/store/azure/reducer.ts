import { produce } from 'immer'
import {
	SET_AZURE_CREDENTIALS,
	SET_LOCAL_PROJECT,
	SET_BRANCH_NAME,
	FORGET_AZURE_CREDENTIALS,
} from './actions'
import { initialAzureState } from './state'
import { sendSketchCommand } from '../../sketchApi'
import type { AzureActionType } from './actions'
import type { AzureState } from './state'

export const azureReducer = (
	state: AzureState = initialAzureState,
	action: AzureActionType,
): AzureState => {
	return produce(state, (nextState) => {
		switch (action.type) {
			case SET_AZURE_CREDENTIALS: {
				nextState.credentials = action.payload
				break
			}

			case SET_LOCAL_PROJECT: {
				nextState.localProject = action.payload
				break
			}

			case SET_BRANCH_NAME: {
				nextState.branchName = action.payload
				break
			}

			case FORGET_AZURE_CREDENTIALS: {
				nextState.credentials = initialAzureState.credentials

				sendSketchCommand('forgetAzureCredentials', {}).catch((error) => console.error(error))

				break
			}

			default: {
				break
			}
		}
	})
}
