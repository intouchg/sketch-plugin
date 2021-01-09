import { produce } from 'immer'
import {
	RESET_PROJECT_STATE,
	SET_AZURE_MODAL_STATE,
	SET_SHOW_REPOS_MODAL,
	SET_AZURE_CREDENTIALS,
	FORGET_AZURE_CREDENTIALS,
	SET_LOCAL_PROJECT,
	SET_BRANCH_NAME,
	SET_HAS_LOCAL_CHANGES,
	SET_ONLINE_STATUS,
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
			case RESET_PROJECT_STATE: {
				nextState.localProject = initialAzureState.localProject
				nextState.branchName = initialAzureState.branchName
				break
			}

			case SET_AZURE_MODAL_STATE: {
				nextState.azureModalState = action.payload
				break
			}

			case SET_SHOW_REPOS_MODAL: {
				nextState.showReposModal = action.payload
				break
			}

			case SET_AZURE_CREDENTIALS: {
				nextState.credentials = action.payload
				break
			}

			case FORGET_AZURE_CREDENTIALS: {
				nextState.credentials = initialAzureState.credentials
				sendSketchCommand('forgetAzureCredentials', {}).catch((error) => console.error(error))
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

			case SET_HAS_LOCAL_CHANGES: {
				nextState.hasLocalChanges = action.payload
				break
			}

			case SET_ONLINE_STATUS: {
				nextState.online = action.payload
				break
			}

			default: {
				break
			}
		}
	})
}
