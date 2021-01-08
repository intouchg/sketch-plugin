import { produce } from 'immer'
import {
	SET_LOADING_STATE,
} from './actions'
import { initialLoadingState } from './state'
import type { LoadingActionType } from './actions'
import type { LoadingState } from './state'

export const loadingReducer = (
	state: LoadingState = initialLoadingState,
	action: LoadingActionType,
): LoadingState => {
	return produce(state, (nextState) => {
		switch (action.type) {
			case SET_LOADING_STATE: {
				const { show, message } = action.payload
				nextState.show = show
				nextState.message = message
				break
			}

			default: {
				break
			}
		}
	})
}
