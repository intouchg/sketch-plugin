import { produce } from 'immer'
import {
	SET_BANNER_MESSAGE,
} from './actions'
import { initialBannerState } from './state'
import type { BannerActionType } from './actions'
import type { BannerState } from './state'

export const bannerReducer = (
	state: BannerState = initialBannerState,
	action: BannerActionType,
): BannerState => {
	return produce(state, (nextState) => {
		switch (action.type) {
			case SET_BANNER_MESSAGE: {
				const { show, type, message } = action.payload
				nextState.show = show
				nextState.type = type
				nextState.message = message
				break
			}

			default: {
				break
			}
		}
	})
}
