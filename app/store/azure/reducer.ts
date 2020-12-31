import { produce } from 'immer'
import {
	SET_AZURE_CREDENTIALS,
	SET_LOCAL_PROJECT,
	SET_BRANCH_NAME,
	RESET_AZURE_STATE,
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

			case RESET_AZURE_STATE: {
				nextState.credentials = initialAzureState.credentials
				nextState.localProject = initialAzureState.localProject
				nextState.branchName = initialAzureState.branchName
				sendSketchCommand('forgetAzureCredentials')
				break
			}

			default: {
				break
			}
		}
	})
}
